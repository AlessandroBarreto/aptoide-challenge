import CardImage from "./components/CardImage";
import { Container, Grid } from "@mui/material";
import { UploadButton } from "./components/UploadButton";
import { useDataS3 } from "./hooks/useDataS3";
import { getBucketUrl } from "./utils";

function App() {
  const { images, handleUpload, handleUpdate, handleDelete, error } =
    useDataS3();

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
              <CardImage
                title={image.Key}
                img={getBucketUrl(image.Key)}
                onClickDelete={() => handleDelete(image.Key)}
                onClickUpdate={() => handleUpdate(image.Key)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
