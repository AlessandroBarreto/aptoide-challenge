import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

interface CardImageProps {
  img: string;
  title: string | undefined;
  onClickDelete?: () => void;
  onClickUpdate?: () => void;
}

export default function CardImage({
  img,
  title,
  onClickDelete,
  onClickUpdate,
}: CardImageProps) {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardMedia component="img" alt="green iguana" height="140" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color={"#674188"}>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="edit" onClick={onClickUpdate}>
          <EditIcon sx={{ color: "#E8E2E2" }} />
        </IconButton>
        <IconButton aria-label="delete" onClick={onClickDelete}>
          <DeleteIcon sx={{ color: "#C3ACD0" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
