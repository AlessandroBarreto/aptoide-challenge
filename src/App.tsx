import { useEffect, useState } from "react";
import AWS from "aws-sdk";
import CardImage from "./components/CardImage";
import { Container, Grid } from "@mui/material";
import { UploadButton } from "./components/UploadButton";
import { getErrorMsg } from "./utils";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "eu-west-3",
  signatureVersion: "v4",
});
const s3 = new AWS.S3();
const bucketName = (keyName: string) =>
  `https://aptoide-challenge.s3.eu-west-3.amazonaws.com/${keyName}`;

function App() {
  const [error, setError] = useState<String>("");
  const [images, setImages] = useState<any>([]);
  const [imgFile, setImgFile] = useState<File>();

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
        Key: `${Date.now()}.${file.name}`,
        Body: file,
      };
      await s3.upload(params).promise();

      setImgFile(file);
      setError("");
    } else {
      setError(errorMsg);
    }
  };

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

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 0",
      }}
    >
      <h1>Aptoide Challenge</h1>
      <UploadButton onChange={handleUpload} />
      {error && <h3>{error}</h3>}
      <Grid container spacing={2} justifyContent="center" marginTop={10}>
        {images.map((image: any) => {
          return (
            <Grid key={image.Key} item xs={12} sm={6} md={4} lg={3}>
              <CardImage img={bucketName(image.Key)} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
