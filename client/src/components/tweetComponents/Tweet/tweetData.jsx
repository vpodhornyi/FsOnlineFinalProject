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
        backgroundColor: "#e1eef6",
        color: "#1d9bf0",
        borderRadius: "50%",
      },
      "&:hover span": {
        color: "#1d9bf0",
      },
    },
    icon: <ReplyIcon sx={{ padding: 1 }} />,
    tooltip: "Reply",
  },
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "#def1eb",
        color: "#00ba7c",
        borderRadius: "50%",
      },
      "&:hover span": {
        color: "#00ba7c",
      },
    },
    icon: <RetweetIcon sx={{ padding: 1 }}></RetweetIcon>,
    tooltip: "Retweet",
  },
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "#f7e0eb",
        color: "#f91880",
        borderRadius: "50%",
      },
      "&:hover span": {
        color: "#f91880",
      },
    },
    icon: <HeartIcon sx={{ padding: 1 }}></HeartIcon>,
    tooltip: "Like",
  },
  {
    itemClassName: {
      "&:hover svg": {
        backgroundColor: "#e1eef6",
        color: "#1d9bf0",
        borderRadius: "50%",
      },
    },
    icon: <DownloadIcon sx={{ padding: 1 }}></DownloadIcon>,
    tooltip: "Bookmark",
  },
];
