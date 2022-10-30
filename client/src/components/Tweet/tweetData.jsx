import { DownloadIcon, HeartIcon, ReplyIcon, RetweetIcon } from "./icons";
import React from "react";
import css from "./style.module.scss";
export const TEST_TWEET = {
  name: "Volodimir",
  userTag: "@Volodimir454608907",
  avatarImgUrl: "https://via.placeholder.com/600/24f355",
  ourFollowers: "Paul Massaro",
  created_at: " . 8 hour",
  body: "German donated Panzerhaubitze 2000s rain fire from above on Russian forces around Bakhmut.",
  likes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  images: [
    { img: "https://via.placeholder.com/150", title: "test" },
    { img: "https://via.placeholder.com/150", title: "test" },
    { img: "https://via.placeholder.com/150", title: "test" },
  ],
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
export const ICONS = [
  {
    itemClassName: css.iconBlue,
    icon: <ReplyIcon className={css.icon} />,
    text: 462,
    tooltip: "Reply",
  },
  {
    itemClassName: css.iconGreen,
    icon: <RetweetIcon className={css.icon}></RetweetIcon>,
    text: 671,
    tooltip: "Retweet",
  },
  {
    itemClassName: css.iconPink,
    icon: <HeartIcon className={css.icon}></HeartIcon>,
    text: "11.6K",
    tooltip: "Like",
  },
  {
    itemClassName: css.iconBlue,
    icon: <DownloadIcon className={css.icon}></DownloadIcon>,
    tooltip: "Share",
  },
];
