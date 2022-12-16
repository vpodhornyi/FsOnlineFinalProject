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
import { openModal } from "../../../redux/modal/action";
import {getActiveId, getActiveUrl} from "../../../redux/modal/selector";
import DeleteTweet from "../DeleteTweet";
import ImageListContainer from "../../imageList/ImageListContainer";
import {handlerBookmark} from "../../../redux/tweet/action";
import Modal from "../ModalImg";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/constants";
import {ModalPage} from "../../index";
const Tweet = ({ tweetInfo }) => {
  const dispatch = useDispatch();
  const activeId = useSelector(getActiveId);
  const activeUrl = useSelector(getActiveUrl);
  const { id, body, images } = tweetInfo;
  const { name, avatarImgUrl, userTag, created_at } = tweetInfo.user;
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <TweetContainer>
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
                <Typography sx={{wordWrap: "break-word", maxWidth: "480px",display:"block"}} variant="p">{body}</Typography>
              </Box>
            </Box>
          </Box>{" "}
            <IconBlue>
              <Tooltip title={"Delete"}>
                <MoreIcon
                  onClick={() => navigate(PATH.TWEET.ROOT+`/${id}`, {state: {background: location}})}
                  sx={{ padding: 1 }}
                />
              </Tooltip>{" "}
            </IconBlue>

        </Content>
            {images.length > 0 && <ImageListContainer photos={images}/>}
            <List
              component="ul"
              disablePadding
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {
                ICONS.length &&
                ICONS.map((itemData, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      ["@media (max-width:700px)"]: {
                        p: 0,
                      },
                      ...itemData.itemClassName,
                    }}
                  >
                    <Tooltip
                      sx={{
                        ["@media (max-width:700px)"]: {
                          p: 0,
                        },
                      }}
                      title={itemData.tooltip}
                    >
                      <ListItemIcon
                        onClick={() => {
                          switch(itemData.tooltip){
                            case "Bookmark": return dispatch(handlerBookmark(id));
                            case "Reply": return navigate(PATH.TWEET.ROOT+`/reply/${id}`, {state: {background: location}});
                          }
                        }}
                      >
                        {itemData.icon}
                      </ListItemIcon>
                    </Tooltip>{" "}
                    {itemData.text && <ListItemText primary={itemData.text} />}
                  </ListItem>
                ))}
            </List>
      </TweetContainer>
    </>
  );
};
Tweet.propTypes = {
  openReply: PropTypes.bool,
  tweetInfo: PropTypes.object,
  setBookmarks: PropTypes.any,
};
export default Tweet;
