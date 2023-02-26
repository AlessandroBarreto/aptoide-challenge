import { useEffect, useState } from "react";
import { s3 } from "../aws/connectS3";
import { getErrorMsg } from "../utils";

export const useDataS3 = () => {
  const [images, setImages] = useState<any>([]);
  const [imgFile, setImgFile] = useState<File>();
  const [error, setError] = useState<String>("");

  const Bucket = process.env.REACT_APP_AWS_BUCKET_NAME || "aptoide-challenge";

  useEffect(() => {
    s3.listObjectsV2(
      {
        Bucket,
      },
      (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          setImages(data.Contents);
        }
      }
    );
  }, [imgFile]);

  const handleUpload = async (e: {
    target: HTMLInputElement & { files: Array<string> };
  }) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const errorMsg = getErrorMsg(file);

    if (!errorMsg) {
      const params = {
        Bucket,
        Key: file.name,
        Body: file,
      };
      await s3.upload(params).promise();

      setImgFile(file);
      setError("");
    } else {
      setError(errorMsg);
    }
  };

  const handleUpdate = async (Key: any) => {
    const newImageName = prompt("Write here a new image Name", Key);

    if (newImageName != Key && newImageName) {
      await s3
        .copyObject({
          Bucket,
          CopySource: `/${Bucket}/${Key}`,
          Key: newImageName,
        })
        .promise();

      await s3.deleteObject({ Bucket, Key }).promise();

      setImgFile(Key);
    }
  };

  const handleDelete = async (Key: any) => {
    await s3.deleteObject({ Bucket, Key }).promise();
    setImgFile(Key);
  };

  return { images, handleUpload, handleUpdate, handleDelete, error };
};
