import Modal from "../../Modal";
import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/modal/action";
import { deleteTweet } from "../../../redux/tweet/action";
import { getActiveId } from "../../../redux/modal/selector";
import Button from "@mui/material/Button";

const DeleteTweet = () => {
  const dispatch = useDispatch();
  const activeId = useSelector(getActiveId);
  return (
    <Modal type={"Delete"}>
      <Box sx={{ padding: "20px" }}>
        <Box sx={{ textAlign: "center" }}>Delete tweet?</Box>
        <Button onClick={() => {
            dispatch(deleteTweet(activeId));
            dispatch(closeModal());
        }}>yes</Button>

        <Button onClick={() => dispatch(closeModal())}>no</Button>
      </Box>
    </Modal>
  );
};
export default DeleteTweet;
