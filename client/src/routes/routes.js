import React, {lazy} from 'react';
import {Navigate} from "react-router-dom";
import {
  Home, Explore, Notifications, Messages, Chat, ChatInfo, Bookmarks, CreateAccount, SelectMessage,
  Lists, UserProfile, UserSearch, Auth, Login, Password, ForgotPassword, SingUp, UserData, Participants,
  GroupEditPage
} from "../pages";
import {PATH} from "../utils/constants";
import {Display, TweetCompose, DeleteTweet} from "../components";
import Reply from "../components/tweetComponents/Reply";
import ModalImg from "../components/tweetComponents/ModalImg";
import Subscribing from "../pages/Subscribing/Subscribing";
import EditProfile from "../pages/UserProfile/components/EditProfile";

const lazyLoading = (path) => {
  const LazyElement = lazy(() => import(path));
  return (<LazyElement/>);
}

export const mainRoutes = (userTag, authorized) => {
  return authorized ?
    [
      {
        path: PATH.ROOT,
        element: <Navigate to={PATH.HOME}/>,
      },
      {
        path: PATH.HOME,
        element: <Home/>,
        children: [],
      },
      {
        path: PATH.EXPLORE,
        element: <Explore/>,
        children: [],
      },
      {
        path: PATH.NOTIFICATIONS,
        element: <Notifications/>,
        children: [],
      },
      {
        path: PATH.MESSAGES.ROOT,
        element: <Messages/>,
        children: [
          {
            index: true,
            element: <SelectMessage/>,
          },
          {
            path: PATH.MESSAGES.CHAT,
            element: <Chat/>,
            children: [
              {
                path: PATH.MESSAGES.CHAT_INFO,
                element: <ChatInfo/>,
              },
              {
                path: PATH.MESSAGES.PARTICIPANTS,
                element: <Participants/>,
              },
            ]
          },
        ],
      },
      {
        path: PATH.LISTS,
        element: <Bookmarks/>,
        children: [],
      },
      {
        path: PATH.LISTS,
        element: <Lists/>,
        children: [],
      },
      {
        path: PATH.USER_PROFILE,
        element: <UserProfile/>,
        children: [],
      },
      {
        path: PATH.FOLLOWERS,
        element: <Subscribing/>,
        children: []
      },
      {
        path: PATH.FOLLOWINGS,
        element: <Subscribing/>,
        children: []
      },
      {
        path: PATH.NO_MATCHES,
        element: <>Not Found PAGE</>,
      },
    ] :
    [
      {
        path: PATH.ROOT,
        element: <Navigate to={PATH.EXPLORE}/>,
      },
      {
        path: PATH.EXPLORE,
        element: <Explore/>,
        children: [],
      },
      {
        path: PATH.USER_PROFILE,
        element: <UserProfile/>,
        children: [],
      },
      {
        path: PATH.NO_MATCHES,
        element: <>Not Found PAGE</>,
      },
    ]
}

export const modalRoutes = authorized => {

  return authorized ? [
      {
        path: PATH.MESSAGES.COMPOSE,
        element: <UserSearch isGroup={false}/>,
        children: [],
      },
      {
        path: PATH.MESSAGES.COMPOSE_GROUP,
        element: <UserSearch isGroup={true}/>,
        children: [],
      },
      {
        path: PATH.MESSAGES.ADD_PEOPLE,
        element: <UserSearch isAdd={true}/>,
        children: [],
      },
      {
        path: PATH.MESSAGES.GROUP_INFO,
        element: <GroupEditPage/>,
      },
      {
        path: PATH.SETTINGS.DISPLAY,
        element: <Display/>,
        children: [],
      },

      {
        path: PATH.TWEET.DELETE,
        element: <DeleteTweet/>,
        children: [],
      },
      {
        path: PATH.SETTINGS.PROFILE,
        element: <EditProfile/>,
        children: []
      },
      {
        path: PATH.TWEET.REPLY,
        element: <Reply/>,
        children: [],
      },
      {
        path: PATH.TWEET.IMG,
        element: <ModalImg/>,
        children: [],
      },

      {
        path: PATH.ALL,
        element: <></>,
      },
    ] :
    [
      {
        path: PATH.AUTH.ROOT,
        element: <Auth/>,
        children: [
          {
            path: PATH.AUTH.SING_IN.LOGIN,
            element: <Login/>,
          },
          {
            path: PATH.AUTH.SING_IN.PASSWORD,
            element: <Password/>,
          },
          {
            path: PATH.AUTH.SING_IN.FORGOT_PASSWORD,
            element: <ForgotPassword/>,
          },
          {
            path: PATH.AUTH.SING_UP.ROOT,
            element: <SingUp/>,
          },
          {
            path: PATH.AUTH.SING_UP.SET_DATA,
            element: <UserData/>,
          },
          {
            path: PATH.AUTH.SING_UP.CREATE_ACCOUNT,
            element: <CreateAccount/>,
          },
        ],
      },
      {
        path: PATH.ALL,
        element: <></>,
      },
    ];
}
