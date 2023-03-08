import Box from "@mui/material/Box";
import React, { forwardRef } from "react";
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PropTypes from "prop-types";
import { MoreIcon, RetweetIcon } from "../../../media/icons";
import {
  AvatarDecorate,
  AvatarWrapper,
  Content,
  IconBlue,
  PostInfo,
  TweetContainer,
  UserAvatar,
  UserName,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import ImageListContainer from "../../imageList/ImageListContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/constants";
import { getPersonalData } from "../../../redux/user/selector";
import ActionItems from "./ActionItems";
import {getAuthorized} from "../../../redux/auth/selector";
const Tweet = forwardRef((props, ref) => {
  const { tweetInfo, styles } = props;
  const { id, body, images, actions, replyCounter, retweetFollowedName } =
    tweetInfo;
  const { name, avatarImgUrl, userTag, created_at } = tweetInfo.user;
  const user = useSelector(getPersonalData);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector(getAuthorized);

  return (
    <>
      <TweetContainer
        ref={ref}
        sx={styles}
        onClick={() => {
          isAuth ? navigate(PATH.TWEET.tweetPage(id)): navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {state: {background: location}})
        }}
      >
        {retweetFollowedName !== "" && (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <RetweetIcon
              sx={{
                width: "16px",
                height: "16px",
                display: "inline-block",
                marginRight: "5px",
              }}
            ></RetweetIcon>
            {retweetFollowedName}
          </Typography>
        )}
        <Content>
          <Box sx={{ display: "flex" }}>
            <AvatarWrapper>
              <UserAvatar alt={name.charAt(0)} src={avatarImgUrl}></UserAvatar>
              <AvatarDecorate variant={"span"}></AvatarDecorate>
            </AvatarWrapper>
            <Box>
              <Box sx={{ marginLeft: 0.688 }}>
                <PostInfo>
                  <UserName
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(PATH.USER_PAGE.userProfile(userTag));
                    }}
                    variant="h2"
                    underline={"hover"}
                  >
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
                <Typography
                  sx={{
                    wordWrap: "break-word",
                    maxWidth: "480px",
                    display: "block",
                  }}
                  variant="p"
                >
                  {body}
                </Typography>
              </Box>
            </Box>
          </Box>{" "}
          {user.userTag === userTag && (
            <IconBlue>
              <Tooltip title={"Delete"}>
                <MoreIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(PATH.TWEET.ROOT + `/${id}`, {
                      state: { background: location },
                    });
                  }}
                  sx={{ padding: 1 }}
                />
              </Tooltip>{" "}
            </IconBlue>
          )}
        </Content>
        {images.length > 0 && <ImageListContainer photos={images} />}
        <ActionItems
          actions={actions}
          replyCounter={replyCounter}
          tweetId={id}
          user={user}
        />
      </TweetContainer>
    </>
  );
});
Tweet.propTypes = {
  tweetInfo: PropTypes.object,
  styles: PropTypes.any,
};
Tweet.displayName = "Tweet";
export default Tweet;
