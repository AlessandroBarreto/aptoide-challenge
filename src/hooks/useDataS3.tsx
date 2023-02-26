import { DeleteObjectRequest, ObjectList } from "aws-sdk/clients/s3";
import { useEffect, useState } from "react";
import { s3 } from "../aws/connectS3";
import { getErrorMsg, KeyType } from "../utils";

export const useDataS3 = () => {
  const [images, setImages] = useState<ObjectList | undefined>([]);
  const [imgFile, setImgFile] = useState<KeyType>();
  const [error, setError] = useState<String>("");

  const Bucket = process.env.REACT_APP_AWS_BUCKET_NAME || "aptoide-challenge";

  // GET
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
  }, [imgFile, Bucket]);

  // POST
  const handleUpload = async (e: {
    target: HTMLInputElement & { files: Array<string> };
  }) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const errorMsg = await getErrorMsg(file);

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

  // PUT
  const handleUpdate = async (Key: KeyType) => {
    const newImageName = prompt("Write here a new image Name", Key);

    if (newImageName !== Key && newImageName) {
      await s3
        .copyObject({
          Bucket,
          CopySource: `/${Bucket}/${Key}`,
          Key: newImageName,
        })
        .promise();

      await s3.deleteObject({ Bucket, Key } as DeleteObjectRequest).promise();

      setImgFile(Key);
    }
  };

  // DELETE
  const handleDelete = async (Key: KeyType) => {
    await s3.deleteObject({ Bucket, Key } as DeleteObjectRequest).promise();
    setImgFile(Key);
  };

  return { images, handleUpload, handleUpdate, handleDelete, error };
};
