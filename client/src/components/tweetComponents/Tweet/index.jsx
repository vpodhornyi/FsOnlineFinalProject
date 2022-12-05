import Box from "@mui/material/Box";
import React from "react";
import {
  ImageList,
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
import CustomImageList from "../../imageList/CustomImageList";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweet } from "../../../redux/tweet/action";
import { openModal } from "../../../redux/modal/action";
import { getActiveId } from "../../../redux/modal/selector";
import DeleteTweet from "../DeleteTweet";
const Tweet = ({ openReply = false, tweetInfo }) => {
  const dispatch = useDispatch();
  const activeId = useSelector(getActiveId);
  const { id, body, images } = tweetInfo;
  const { name, avatarImgUrl, userTag, created_at } = tweetInfo.user;
  return (
    <>
      <TweetContainer>
        <Content>
          <Box sx={{ display: "flex" }}>
            {" "}
            <AvatarWrapper>
              <UserAvatar alt={name} src={avatarImgUrl}></UserAvatar>
              {openReply && <AvatarDecorate variant={"span"}></AvatarDecorate>}
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
                <Typography variant="p">{body}</Typography>
              </Box>
            </Box>
          </Box>{" "}
          {!openReply && (
            <IconBlue>
              <Tooltip title={"Delete"}>
                <MoreIcon
                  onClick={() =>
                    dispatch(openModal({ id: id, typeModal: "Delete" }))
                  }
                  sx={{ padding: 1 }}
                />
              </Tooltip>{" "}
            </IconBlue>
          )}
        </Content>
        {!openReply && (
          <>
            <ImageList
              variant="masonry"
              cols={3}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!openReply && <CustomImageList itemData={images} />}
            </ImageList>

            <List
              component="ul"
              disablePadding
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {!openReply &&
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
                          itemData.tooltip === "Reply" &&
                            dispatch(openModal({ id: id, typeModal: "Reply" }));
                        }}
                      >
                        {itemData.icon}
                      </ListItemIcon>
                    </Tooltip>{" "}
                    {itemData.text && <ListItemText primary={itemData.text} />}
                  </ListItem>
                ))}
            </List>
          </>
        )}
      </TweetContainer>
      {activeId === id && !openReply && <Reply tweetInfo={tweetInfo} />}
      {activeId === id && !openReply && <DeleteTweet />}
    </>
  );
};
Tweet.propTypes = {
  openReply: PropTypes.bool,
  tweetInfo: PropTypes.object,
};
export default Tweet;
