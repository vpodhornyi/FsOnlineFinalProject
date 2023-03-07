import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {  ModalPage } from "../../index";
import { PATH } from "../../../utils/constants";
import { BackgroundContext } from "../../../utils/context";
import { deleteTweet } from "../../../redux/tweet/action";
import { useDispatch, useSelector } from "react-redux";
import {getCustomizationTheme, getPersonalData} from "../../../redux/user/selector";
import { ModalButton } from "../../buttons/ModalButton";
import {BACKGROUND} from "../../../utils/theme";

const DeleteTweet = () => {
  const { background } = useContext(BackgroundContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {backgroundColor} = useSelector(getCustomizationTheme);
  return (
    <ModalPage
      styles={{
        alignItems: "center",

        "& .ModalWrapper": {
          width: "auto",
          height: "auto",
        },
      }}
      element={
        <BoxWrapper>
          <Box>
            <Typography
              variant={"h3"}
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                lineHeight: "24px",
                marginBottom: "8px",
              }}
            >
              Delete Tweet?
            </Typography>
            <Typography
              variant={"p"}
              sx={{
                  display:"block",
                color: "rgb(83, 100, 113)",
                fontSize: "15px",
                  marginBottom: "24px",
                  lineHeight:"20px",
              }}
            >
              This can’t be undone and it will be removed from your profile, the
              timeline of any accounts that follow you, and from Twitter search
              results.
            </Typography>{" "}
          </Box>
          <ModalButton
              styles={{background: "red", color: "#fff","&:hover":{background:"#dc1e29"}}}
            click={() => {
              dispatch(deleteTweet(+id));
              navigate(-1);
            }}
          >
            Delete
          </ModalButton>
          <ModalButton
              styles={{border: "1px solid rgb(207, 217, 222)",color:"black","&:hover":{background:BACKGROUND[backgroundColor]?.palette.input.background}}}
            click={() => navigate(background?.pathname || PATH.ROOT)}
          >
            Cancel
          </ModalButton>
        </BoxWrapper>
      }
    />
  );
};

const BoxWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "314px",
  maxHeight: "304px",
  backgroundColor: theme.palette.background.main,
  color: theme.palette.textColor,
  padding: "32px",
  position: "relative",
    borderRadius:"15px",
}));

DeleteTweet.propTypes = {
  item: PropTypes.object,
};
export default DeleteTweet;
