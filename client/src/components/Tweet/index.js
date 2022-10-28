import Box from "@mui/material/Box";
import React from "react";
import {
  Avatar,
  Card,
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
import {
  DownloadIcon,
  HeartIcon,
  MoreIcon,
  ReplyIcon,
  RetweetIcon,
} from "./icons";
import css from "./style.module.scss";

const TEST_TWEET = {
  name: "Volodimir",
  userTag: "@Volodimir454608907",
  avatarImgUrl: "https://via.placeholder.com/600/24f355",
  ourFollowers: "Paul Massaro",
  created_at: " . 8 hour",
  body: "German donated Panzerhaubitze 2000s rain fire from above on Russian forces around Bakhmut.",
  likes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  reply: [
    {
      name: "Petro",
      userTag: "@Petro454608907",
      avatarImgUrl: "https://via.placeholder.com/150/d32776",
      ourFollowers: ["Paul Djonsonuik"],
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      reply: [],
    },
  ],
};

const Tweet = () => {
  const { name, avatarImgUrl, ourFollowers, userTag, body, created_at } =
    TEST_TWEET;

  return (
    <Card
      sx={{ color: "rgb(83, 100, 113)", textDecoration: "none" }}
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
        <MoreIcon />
      </Box>
      <List
        component="div"
        disablePadding
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <ListItem className={css.reply}>
          <ListItemIcon className={css.listIcon}>
            <ReplyIcon className={css.icon} />
          </ListItemIcon>

          <ListItemText className={css.text} primary="462" />
        </ListItem>
        <ListItem className={css.retweet}>
          <ListItemIcon className={css.listIcon}>
            <RetweetIcon className={css.icon} />
          </ListItemIcon>
          <ListItemText className={css.text} primary="671" />
        </ListItem>{" "}
        <ListItem className={css.heart}>
          <ListItemIcon className={css.listIcon}>
            <HeartIcon className={css.icon} />
          </ListItemIcon>
          <ListItemText primary="11.6K" className={css.text} />
        </ListItem>{" "}
        <ListItem>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </Card>
  );
};
export default Tweet;
