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
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <Grid container spacing={2} justifyContent="center" marginTop={8}>
        {images?.map(({ Key }) => {
          return (
            <Grid key={Key} item xs={12} sm={6} md={4} lg={3}>
              <CardImage
                title={Key}
                img={getBucketUrl(Key)}
                onClickDelete={() => handleDelete(Key)}
                onClickUpdate={() => handleUpdate(Key)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
