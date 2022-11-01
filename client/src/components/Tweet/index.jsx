import Box from "@mui/material/Box";
import React from "react";
import {
  Avatar,
  Card,
  ImageList,
  ImageListItem,
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
import css from "./style.module.scss";
import { ICONS, TEST_TWEET } from "./tweetData";
import PropTypes from "prop-types";
import { MoreIcon } from "../../media/icons";
import Reply from "../Reply/Reply";
import {
  AvatarDecorate,
  AvatarSpan,
  AvatarWrapper,
  Content,
  HeaderInfo,
  HeaderInfoLink,
  PostInfo,
  TweetContainer,
  UserAvatar,
  UserName,
} from "./style";

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
  const borderCard = openModal ? "none" : "1px solid  rgb(239, 243, 244)";
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
            <Box className={css.iconBlue}>
              <Tooltip title={"More"}>
                <MoreIcon className={css.icon} />
              </Tooltip>{" "}
            </Box>
          )}
        </Content>
        {!openModal && (
          <>
            <ImageList className={css.imgWrapper}>
              {!openModal &&
                images.map((item, i) => (
                  <ImageListItem key={i}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
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
                    }}
                    className={itemData.itemClassName}
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
                    {itemData.text && (
                      <ListItemText
                        className={css.text}
                        primary={itemData.text}
                      />
                    )}
                  </ListItem>
                ))}
            </List>
          </>
        )}
      </TweetContainer>
      <Reply open={open} handleClose={handleClose} />
    </>
  );
};
Tweet.propTypes = {
  openModal: PropTypes.bool,
};
export default Tweet;
