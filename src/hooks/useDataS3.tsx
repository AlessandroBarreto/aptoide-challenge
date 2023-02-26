import { useEffect, useState } from "react";
import { s3 } from "../aws/connectS3";
import { getErrorMsg } from "../utils";

export const useDataS3 = () => {
  const [images, setImages] = useState<any>([]);
  const [imgFile, setImgFile] = useState<File>();
  const [error, setError] = useState<String>("");

  useEffect(() => {
    s3.listObjectsV2(
      {
        Bucket: "aptoide-challenge",
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
    console.log(errorMsg);

    if (!errorMsg) {
      const params = {
        Bucket: "aptoide-challenge",
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

  const handleUpdate = async (key: any) => {
    const newImageName = prompt("Write here a new image Name", key);

    if (newImageName != key && newImageName) {
      await s3
        .copyObject({
          Bucket: "aptoide-challenge",
          CopySource: `/aptoide-challenge/${key}`,
          Key: newImageName,
        })
        .promise();

      await s3
        .deleteObject({ Bucket: "aptoide-challenge", Key: key })
        .promise();

      setImgFile(key);
    }
  };

  const handleDelete = async (key: any) => {
    await s3.deleteObject({ Bucket: "aptoide-challenge", Key: key }).promise();
    setImgFile(key);
  };

  return { images, handleUpload, handleUpdate, handleDelete, error };
};
