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
import Modal from "../../Modal";
const Tweet = ({ tweetInfo }) => {
  const dispatch = useDispatch();
  const activeId = useSelector(getActiveId);
  const activeUrl = useSelector(getActiveUrl);
  const { id, body, images } = tweetInfo;
  const { name, avatarImgUrl, userTag, created_at } = tweetInfo.user;

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
                  onClick={() => {
                    dispatch(openModal({id: id, typeModal: "Delete"}))
                  }}
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
                            case "Reply": return dispatch(openModal({ id: id, typeModal: "Reply" }));
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
      {activeId === id && <Reply tweetInfo={tweetInfo} />}
      {activeId === id && <DeleteTweet />}
      {activeUrl&&<Modal type={"FULL_IMG"}><img src={activeUrl} alt="FULL_IMG"/></Modal>}
    </>
  );
};
Tweet.propTypes = {
  openReply: PropTypes.bool,
  tweetInfo: PropTypes.object,
  setBookmarks: PropTypes.any,
};
export default Tweet;
