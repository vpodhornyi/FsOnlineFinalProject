import React from "react";
import {
  DownloadIcon,
  HeartIcon,
  ReplyIcon,
  RetweetIcon,
} from "../../../media/icons";

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
    tooltip: "Bookmark",
  },
];
