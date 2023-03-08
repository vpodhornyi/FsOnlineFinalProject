import React from "react";
import { icons } from "./tweetData";
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCustomizationTheme } from "../../../redux/user/selector";
import { BACKGROUND } from "../../../utils/theme";
import { getAuthorized } from "../../../redux/auth/selector";

const ActionItems = ({ actions, replyCounter, tweetId, user }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector(getCustomizationTheme);
  const isAuth = useSelector(getAuthorized);

  const ICONS = icons(BACKGROUND[theme?.backgroundColor]?.palette);

  const changeAction = (action) =>
    dispatch(changeActionsTweet({ actionType: action, tweetId: tweetId }));
  const actionsObj = {
    LIKE: {
      counter: 0,
      color: "#f91880",
      handler: () =>
        isAuth
          ? changeAction("LIKE")
          : navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {
              state: { background: location },
            }),
      userBol: false,
    },
    RETWEET: {
      counter: 0,
      color: "#00ba7c",
      handler: () =>
        isAuth
          ? changeAction("RETWEET")
          : navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {
              state: { background: location },
            }),
      userBol: false,
    },
    BOOKMARK: {
      counter: 0,
      color: "#1d9bf0",
      handler: () => {
        if (isAuth) {
          if (location.pathname === "/i/bookmarks") {
            dispatch(changeBookmark(tweetId));
          }
          changeAction("BOOKMARK");
        } else {
          navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {
            state: { background: location },
          });
        }
      },
      userBol: false,
    },
    REPLY: {
      color: "#1d9bf0",
      handler: () => {
        if (isAuth) {
          navigate(PATH.TWEET.ROOT + `/reply/${tweetId}`, {
            state: { background: location },
          });
        } else {
          navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {
            state: { background: location },
          });
        }
      },
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
