import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { IconByName, ModalPage, TweetForm } from "../../index";
import IconButton from "@mui/material/IconButton";
import { PATH } from "../../../utils/constants";
import { BackgroundContext } from "../../../utils/context";
import TweetReply from "../TweetReply";
import api, { URLS } from "../../../services/API";
import {getCustomizationTheme, getPersonalData} from "../../../redux/user/selector";
import { useSelector } from "react-redux";
import {BACKGROUND} from "../../../utils/theme";

const TweetModal = () => {
  const { background } = useContext(BackgroundContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const {backgroundColor} = useSelector(getCustomizationTheme)
  const [tweetInfo, setTweetInfo] = useState(null);
  const user = useSelector(getPersonalData);
  useEffect(() => {
    (async function () {
      setTweetInfo(await api.get(URLS.TWEET.getTweet(id)));
    })();
  }, []);

  const tweetOrReply =
    id == user.id ? (
      <TweetForm
        placeholderText={"What's happening"}
        tweetType={"Tweet"}
        parentTweetId={id}
      />
    ) : (
      <>
        <TweetReply tweetInfo={tweetInfo} />
        <TweetForm
          placeholderText={"Tweet your reply"}
          tweetType={"Reply"}
          parentTweetId={id}
        />
      </>
    );
  return (
    <>
      {tweetInfo && (
        <ModalPage
          styles={{ alignItems: "start", paddingBottom: 0}}
          element={
            <BoxWrapper
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "300px",
                paddingBottom: 0,
                background: BACKGROUND[backgroundColor]?.palette.background.main
              }}
            >
              <IconButton
                className="Close"
                aria-label="close"
                onClick={() => navigate(background?.pathname || PATH.ROOT)}
                sx={{color: BACKGROUND[backgroundColor]?.palette.textColor}}
              >
                <IconByName iconName="Close" />
              </IconButton>
              {tweetOrReply}
            </BoxWrapper>
          }
        />
      )}
    </>
  );
};

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.common.white,
  padding: "40px 0",
  position: "relative",

  [theme.breakpoints.up("sm")]: {
    width: "600px",
    borderRadius: 16,
    marginTop: 80,
  },

  "& .Close": {
    position: "absolute",
    top: 5,
    left: 5,
  },
}));

export default TweetModal;
