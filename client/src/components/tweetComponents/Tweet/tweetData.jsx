import React from "react";
import {
  DownloadIcon,
  HeartIcon,
  ReplyIcon,
  RetweetIcon,
} from "../../../media/icons";

export const icons = (palette) => {
  return [
    {
      itemClassName: {
        "&:hover svg": {
          backgroundColor: palette?.action.iconHover,
          color: "#1d9bf0",
          borderRadius: "50%",
        },
        "&:hover span": {
          color: "#1d9bf0",
        },
      },
      icon: <ReplyIcon sx={{ padding: 1, color: palette?.textColor }} />,
      tooltip: "Reply",
    },
    {
      itemClassName: {
        "&:hover svg": {
          backgroundColor: palette?.action.iconHover,
          color: "#00ba7c",
          borderRadius: "50%",
        },
        "&:hover span": {
          color: "#00ba7c",
        },
      },
      icon: (
          <RetweetIcon sx={{ padding: 1, color: palette?.textColor }}></RetweetIcon>
      ),
      tooltip: "Retweet",
    },
    {
      itemClassName: {
        "&:hover svg": {
          backgroundColor: palette?.action.iconHover,
          color: "#f91880",
          borderRadius: "50%",
        },
        "&:hover span": {
          color: "#f91880",
        },
      },
      icon: (
          <HeartIcon sx={{ padding: 1, color: palette?.textColor }}></HeartIcon>
      ),
      tooltip: "Like",
    },
    {
      itemClassName: {
        "&:hover svg": {
          backgroundColor: palette?.action.iconHover,
          color: "#1d9bf0",
          borderRadius: "50%",
        },
      },
      icon: (
          <DownloadIcon
              sx={{ padding: 1, color: palette?.textColor }}
          ></DownloadIcon>
      ),
      tooltip: "Bookmark",
    },
  ]

};


// const styled
