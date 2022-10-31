import React from "react";
import Tweet from "../Tweet";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import css from "./style.module.scss";
import { CloseIcon } from "../../media/icons";
import Box from "@mui/material/Box";
import { TweetForm } from "../TweetForm";
const Reply = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        className={css.wrapper}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Tweet openModal={true} />
        <TweetForm buttonText={"Reply"} placeholderText={"Tweet your reply"} />
      </Dialog>
    </div>
  );
};

export default Reply;
