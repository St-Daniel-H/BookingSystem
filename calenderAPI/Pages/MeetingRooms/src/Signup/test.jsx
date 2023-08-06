import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import image from "../Images/background-image.jpg";
const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    margin: 16,
    justifyContent: "center",
    alignItems: "middle",
  },
  button: {
    margin: 8,
    borderColor: "#313131",
    color: "#313131",
  },
};

const MessageButtons = () => {
  const { enqueueSnackbar } = useSnackbar();
  const message = "hey";
  function handleClick() {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "error",
    });
  }

  return (
    <Paper style={styles.root}>
      <Button variant="outlined" style={styles.button} onClick={handleClick}>
        Show Snackbar
      </Button>
          <img src="../../public/Uploads/48577dcf-c452-483c-8da0-c4fdf71f9321.jfif" alt="Default Logo" />
    </Paper>
  );
};

export default MessageButtons;
