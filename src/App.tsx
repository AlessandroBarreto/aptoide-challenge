import { useEffect, useState } from "react";
import AWS from "aws-sdk";
import CardImage from "./components/CardImage";
import { Container, Grid } from "@mui/material";

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
  const [error, setError] = useState("");
  const [images, setImages] = useState<any>([]);

  //console.log(s3);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "image/png") {
      setError("File must be in PNG format");
      return;
    }

    if (file.size > 5 * 1000000) {
      setError("File size must be less than 5MBs");
      return;
    }

    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      const ratio = img.height / img.width;
      if (ratio > 2 || ratio < 0.5) {
        setError("Image ratio must not exceed 2");
      }
    };

    const params = {
      Bucket: "aptoide-challenge",
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    await s3.upload(params).promise();
    //setImageUrl(Location);
    //console.log(Location);

    setError("");
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
  }, []);

  console.log(images);

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
      <input type="file" onChange={handleUpload} />
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
