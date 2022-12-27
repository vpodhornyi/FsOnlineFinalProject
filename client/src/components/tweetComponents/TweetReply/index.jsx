import Box from "@mui/material/Box";
import React from "react";
import {
  Link,
  Typography,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PropTypes from "prop-types";
import {
  AvatarWrapper,
  Content,
  PostInfo,
  TweetContainer,
  UserAvatar,
  UserName,
} from "./style";
const TweetReply = ({ tweetInfo }) => {
  const {  body } = tweetInfo;
  const { name, avatarImgUrl, userTag, created_at } = tweetInfo.user;

  return (
    <>
      <TweetContainer>
        <Content>
          <Box sx={{ display: "flex" }}>
            <AvatarWrapper>
              <UserAvatar alt={name} src={avatarImgUrl}></UserAvatar>
            </AvatarWrapper>
            <Box>
              <Box sx={{ marginLeft: 0.688 }}>
                <PostInfo>
                  <UserName variant="h2" underline={"hover"}>
                    {name}
                  </UserName>
                  <VerifiedIcon
                    sx={{ w: 18, h: 18, color: "#1d9bf0", margin: "0 0.125" }}
                  />
                  <Typography variant="h4" sx={{ font: "inherit" }}>
                    {userTag}
                  </Typography>
                  <Link
                    variant="h4"
                    sx={{ font: "inherit", color: "inherit" }}
                    underline={"hover"}
                  >
                    {created_at}
                  </Link>
                </PostInfo>
                <Typography sx={{wordWrap: "break-word", maxWidth: "480px",display:"block"}} variant="p">{body}</Typography>
              </Box>
            </Box>
          </Box>{" "}

        </Content>

      </TweetContainer>

    </>
  );
};
TweetReply.propTypes = {
  tweetInfo: PropTypes.object,
};
export default TweetReply;
