import React from "react";
import {
  DownloadIcon,
  HeartIcon,
  ReplyIcon,
  RetweetIcon,
} from "../../media/icons";
export const TEST_TWEET = {
  id: "1",
  name: "Volodimir",
  userTag: "@Volodimir454608907",
  avatarImgUrl: "https://via.placeholder.com/600/24f355",
  tweetType: "TWEET",
  ourFollowers: "Paul Massaro",
  created_at: " . 8 hour",
  body: "German donated Panzerhaubitze 2000s rain fire from above on Russian forces around Bakhmut.",
  likes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  images: [
    {
      img:
        "https://via.placeholder.com/300.png/09f/fff\n" +
        "\n" +
        "C/O https://placeholder.com/",
      title: "test",
    },
    { img: "https://via.placeholder.com/150", title: "test" },
    { img: "https://via.placeholder.com/150", title: "test" },
  ],
  reply: [
    {
      name: "Petro",
      userTag: "@Petro454608907",
      avatarImgUrl: "https://via.placeholder.com/150/d32776",
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      reply: [],
    },
  ],
};
export const ICONS = [
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "lightcyan",
        color: "rgb(29, 155, 240)",
        borderRadius: "50%",
      },
      "&:hover span": {
        color: "rgb(29, 155, 240)",
      },
    },
    icon: <ReplyIcon sx={{ padding: 1 }} />,
    text: 462,
    tooltip: "Reply",
  },
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "lightgreen",
        color: "green",
        borderRadius: "50%",
      },
      "&:hover span": {
        color: "green",
      },
    },
    icon: <RetweetIcon sx={{ padding: 1 }}></RetweetIcon>,
    text: 671,
    tooltip: "Retweet",
  },
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "lightpink",
        color: "pink",
        borderRadius: "50%",
      },
      "&:hover span": {
        color: "pink",
      },
    },
    icon: <HeartIcon sx={{ padding: 1 }}></HeartIcon>,
    text: "11.6K",
    tooltip: "Like",
  },
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "lightcyan",
        color: "rgb(29, 155, 240)",
        borderRadius: "50%",
      },
    },
    icon: <DownloadIcon sx={{ padding: 1 }}></DownloadIcon>,
    tooltip: "Share",
  },
];
