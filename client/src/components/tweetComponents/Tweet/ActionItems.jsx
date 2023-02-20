import React from "react";
import { ICONS } from "./tweetData";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  changeActionsTweet,
  changeBookmark,
} from "../../../redux/tweet/action";
import { PATH } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ActionItems = ({ actions, replyCounter, tweetId, user }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const changeAction = (action) =>
    dispatch(changeActionsTweet({ actionType: action, tweetId: tweetId }));
  const actionsObj = {
    LIKE: {
      counter: 0,
      color: "#f91880",
      handler: () => changeAction("LIKE"),
      userBol: false,
    },
    RETWEET: {
      counter: 0,
      color: "#00ba7c",
      handler: () => changeAction("RETWEET"),
      userBol: false,
    },
    BOOKMARK: {
      counter: 0,
      color: "#1d9bf0",
      handler: () => {
        if (location.pathname === "/i/bookmarks") {
          dispatch(changeBookmark(tweetId));
        }
        changeAction("BOOKMARK");
      },
      userBol: false,
    },
    REPLY: {
      color: "#1d9bf0",
      handler: () =>
        navigate(PATH.TWEET.ROOT + `/reply/${tweetId}`, {
          state: { background: location },
        }),
      userBol: false,
    },
  };
  actions?.forEach((action) => {
    actionsObj[action.actionType].counter += 1;
    if (user?.id === action.user.id) {
      actionsObj[action.actionType].userBol = true;
    }
  });
  return (
    <List
      component="ul"
      disablePadding
      sx={{ display: "flex", justifyContent: "space-around" }}
    >
      {ICONS?.map((itemData, index) => {
        const currentActive = actionsObj[itemData.tooltip.toUpperCase()];
        const mediaStyle = {
          ["@media (max-width:700px)"]: {
            p: 0,
          },
        };
        const chooseIconHandler = (e) => {
          e.stopPropagation();
          currentActive.handler();
        };
        const activeColor = currentActive.userBol && currentActive.color;
        return (
          <ListItem
            key={index}
            sx={{
              ...mediaStyle,
              ...itemData.itemClassName,
              color: activeColor,
              "& span": {
                color: activeColor,
              },
              "& svg": {
                color: activeColor,
              },
            }}
          >
            <Tooltip sx={mediaStyle} title={itemData.tooltip}>
              <ListItemIcon onClick={chooseIconHandler}>
                {itemData.icon}
              </ListItemIcon>
            </Tooltip>{" "}
            <ListItemText
              primary={
                itemData.tooltip === "Reply"
                  ? replyCounter
                  : currentActive.counter
              }
            />
          </ListItem>
        );
      })}{" "}
    </List>
  );
};
ActionItems.propTypes = {
  actions: PropTypes.array,
  replyCounter: PropTypes.number,
  tweetId: PropTypes.number,
  user: PropTypes.object,
};
export default ActionItems;
