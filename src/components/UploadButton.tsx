import Button from "@mui/material/Button";

interface UploadButtonProps {
  onChange: (e: any) => Promise<void>;
}

export const UploadButton = ({ onChange }: UploadButtonProps) => {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: "none" }}
        id="upload-photo"
        name="upload-photo"
        type="file"
        onChange={onChange}
      />

      <Button color="secondary" variant="contained" component="span">
        Upload Image
      </Button>
    </label>
  );
};
