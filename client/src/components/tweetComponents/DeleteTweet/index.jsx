import Modal from "../../Modal";
import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/modal/action";
import { deleteTweet } from "../../../redux/tweet/action";
import { getActiveId } from "../../../redux/modal/selector";
import Button from "@mui/material/Button";
import {getPersonalData} from "../../../redux/user/selector";

const DeleteTweet = () => {
  const dispatch = useDispatch();
  const activeId = useSelector(getActiveId);
  const personData = useSelector(getPersonalData);
  return (
    <Modal type={"Delete"}>
      <Box sx={{ padding: "20px" }}>
        <Box sx={{ textAlign: "center" }}>Delete tweet?</Box>
        <Button onClick={() => {
            dispatch(deleteTweet(personData.id,activeId));
            dispatch(closeModal());
        }}>yes</Button>

        <Button onClick={() => dispatch(closeModal())}>no</Button>
      </Box>
    </Modal>
  );
};
export default DeleteTweet;
