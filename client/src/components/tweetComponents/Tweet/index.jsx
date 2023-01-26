import Box from "@mui/material/Box";
import React from "react";
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
import { ICONS } from "./tweetData";
import PropTypes from "prop-types";
import { MoreIcon } from "../../../media/icons";
import Reply from "../Reply";
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
import {
  changeActionsTweet,
  changeBookmark,
} from "../../../redux/tweet/action";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/constants";
import { getPersonalData } from "../../../redux/user/selector";

const Tweet = ({ tweetInfo }) => {
  const dispatch = useDispatch();
  const { id, body, images, actions } = tweetInfo;
  const { name, avatarImgUrl, userTag, created_at } = tweetInfo.user;
  const user = useSelector(getPersonalData);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <TweetContainer className='TweetContainer'>
        <Content>
          <Box sx={{ display: "flex" }}>
            <AvatarWrapper>
              <UserAvatar alt={name} src={avatarImgUrl}></UserAvatar>
              <AvatarDecorate variant={"span"}></AvatarDecorate>
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
          <IconBlue>
            <Tooltip title={"Delete"}>
              <MoreIcon
                onClick={() =>
                  navigate(PATH.TWEET.ROOT + `/${id}`, {
                    state: { background: location },
                  })
                }
                sx={{ padding: 1 }}
              />
            </Tooltip>{" "}
          </IconBlue>
        </Content>
        {images.length > 0 && <ImageListContainer photos={images} />}
        <List
          component="ul"
          disablePadding
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          {ICONS?.map((itemData, index) => {
            const filterActions = actions?.filter(
              (action) =>
                itemData.tooltip.toUpperCase() ===
                action.actionType.toUpperCase()
            );
            const findAction = filterActions?.find(
              (action) => user.id === action.user.id
            );
            const findActiveStyle = (type) => {
              switch (type) {
                case "LIKE":
                  return "pink";
                case "BOOKMARK":
                  return "blue";
                case "RETWEET":
                  return "green";
                default:
                  return "inherit";
              }
            };

            const activeStyleStr = findActiveStyle(findAction?.actionType);
            const mediaStyle = {
              ["@media (max-width:700px)"]: {
                p: 0,
              },
            };
            const chooseIconHandler = () => {
              switch (itemData.tooltip) {
                case "Bookmark":
                  dispatch(
                    changeActionsTweet({
                      actionType: "BOOKMARK",
                      tweetId: id,
                    })
                  ).then(
                    (res) => res && dispatch(changeBookmark(res.tweet.id))
                  );

                  break;
                case "Reply":
                  return navigate(PATH.TWEET.ROOT + `/reply/${id}`, {
                    state: { background: location },
                  });
                case "Like":
                  return dispatch(
                    changeActionsTweet({ actionType: "LIKE", tweetId: id })
                  );
                case "Retweet":
                  return dispatch(
                    changeActionsTweet({ actionType: "RETWEET", tweetId: id })
                  );
              }
            };

            return (
              <ListItem
                key={index}
                sx={{
                  ...mediaStyle,
                  ...itemData.itemClassName,
                  color: activeStyleStr,
                  "& span": {
                    color: activeStyleStr,
                  },
                  "& svg": {
                    color: activeStyleStr,
                  },
                }}
              >
                <Tooltip sx={mediaStyle} title={itemData.tooltip}>
                  <ListItemIcon onClick={chooseIconHandler}>
                    {itemData.icon}
                  </ListItemIcon>
                </Tooltip>{" "}
                <ListItemText primary={filterActions.length} />
              </ListItem>
            );
          })}
        </List>
      </TweetContainer>
    </>
  );
};
Tweet.propTypes = {
  tweetInfo: PropTypes.object,
  setBookmarks: PropTypes.any,
};
export default Tweet;
