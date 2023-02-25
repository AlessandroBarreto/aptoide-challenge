import { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./App.css";

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
          console.log(data.Contents);
          setImages(data.Contents);
        }
      }
    );
  }, []);

  console.log(images);

  return (
    <div className="App">
      <input type="file" onChange={handleUpload} />

      {error && <h3>{error}</h3>}
      {images.map((image: any) => {
        return (
          <div key={image.Key} style={{ marginTop: "10px" }}>
            <img src={bucketName(image.Key)} alt="uploaded" />
          </div>
        );
      })}
    </div>
  );
}

export default App;
