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
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ICONS, TEST_TWEET } from "./tweetData";
import PropTypes from "prop-types";
import { MoreIcon } from "../../media/icons";
import Index from "../Reply";
import {
  AvatarDecorate,
  AvatarWrapper,
  Content,
  HeaderInfo,
  HeaderInfoLink,
  IconBlue,
  PostInfo,
  TweetContainer,
  UserAvatar,
  UserName,
} from "./style";
import CustomImageList from "../CustomImageList";
const Tweet = ({ openModal = false }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    name,
    avatarImgUrl,
    ourFollowers,
    userTag,
    body,
    created_at,
    images,
  } = TEST_TWEET;
  return (
    <>
      <TweetContainer>
        <HeaderInfo>
          <PersonIcon sx={{ width: 14, height: 14 }} />
          <HeaderInfoLink underline={"hover"}>{ourFollowers}</HeaderInfoLink>
        </HeaderInfo>
        <Content>
          <Box sx={{ display: "flex" }}>
            {" "}
            <AvatarWrapper>
              <UserAvatar alt={name} src={avatarImgUrl}></UserAvatar>
              {openModal && <AvatarDecorate variant={"span"}></AvatarDecorate>}
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
          {!openModal && (
            <IconBlue>
              <Tooltip title={"More"}>
                <MoreIcon sx={{ padding: 1 }} />
              </Tooltip>{" "}
            </IconBlue>
          )}
        </Content>
        {!openModal && (
          <>
            <ImageList
              variant="masonry"
              cols={3}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!openModal && <CustomImageList itemData={images} />}
            </ImageList>

            <List
              component="ul"
              disablePadding
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {ICONS.length &&
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
                        onClick={() =>
                          itemData.tooltip === "Reply" && handleClickOpen()
                        }
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
      <Index open={open} handleClose={handleClose} />
    </>
  );
};
Tweet.propTypes = {
  openModal: PropTypes.bool,
};
export default Tweet;
