import Box from "@mui/material/Box";
import React from "react";
import {
  Avatar,
  Card,
  CardMedia,
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
import { MoreIcon } from "./icons";
import css from "./style.module.scss";
import { ICONS, TEST_TWEET } from "./tweetData";

const Tweet = () => {
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
    <Card
      sx={{
        borderRadius: 0,
        color: "rgb(83, 100, 113)",
        textDecoration: "none",
      }}
      className={css.wrapper}
    >
      <Box className={css.followerBlock}>
        <PersonIcon className={css.person} />

        <Link
          sx={{ color: "inherit", fontWeight: 700 }}
          className={css.followerText}
          underline={"hover"}
        >
          {ourFollowers}
        </Link>
      </Box>
      <Box className={css.content}>
        <Box sx={{ display: "flex" }}>
          {" "}
          <Avatar alt={name} src={avatarImgUrl} className={css.avatar}></Avatar>
          <Box>
            <Box>
              <Box className={css.postInfo}>
                <Link
                  sx={{ fontSize: "inherit", fontWeight: 700, color: "black" }}
                  variant="h2"
                  underline={"hover"}
                  className={css.name}
                >
                  {name}
                </Link>
                <VerifiedIcon className={css.verified} />
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
              </Box>
              <Typography variant="p">{body}</Typography>
            </Box>
          </Box>
        </Box>{" "}
        <Box className={css.iconBlue}>
          <Tooltip title={"More"}>
            <MoreIcon className={css.icon} />
          </Tooltip>{" "}
        </Box>
      </Box>
      <ImageList className={css.imgWrapper}>
        {images.map((item) => (
          <ImageListItem key={item.img}>
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
            <ListItem key={index} className={itemData.itemClassName}>
              <Tooltip title={itemData.tooltip}>
                <ListItemIcon>{itemData.icon}</ListItemIcon>
              </Tooltip>{" "}
              {itemData.text && (
                <ListItemText className={css.text} primary={itemData.text} />
              )}
            </ListItem>
          ))}
      </List>
    </Card>
  );
};
export default Tweet;
