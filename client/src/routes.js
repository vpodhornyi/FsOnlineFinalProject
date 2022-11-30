import React, {lazy} from 'react';
import {Navigate} from "react-router-dom";
import {
  Home, Explore, Notifications, Messages, Chat, SelectMessage, ChatInfo, Bookmarks, CreateAccount,
  Lists, UserProfile, DialogNewMessage, Auth, Login, Password, ForgotPassword, SingUp, UserData
} from "./pages";
import {PATH} from "./utils/constants";
import {SectionDetails, SectionNavigation, Display} from "./components";

export const lazyLoading = (path) => {
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
        element: <SectionNavigation Body={Messages}/>,
        children: [
          {
            index: true,
            element: <SectionDetails Body={SelectMessage}/>,
          },
          {
            path: PATH.MESSAGES.CHAT,
            element: <SectionDetails Body={Chat}/>,
          },
          {
            path: PATH.MESSAGES.CHAT_INFO,
            element: <SectionDetails Body={ChatInfo}/>,
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
    ]
}

export const modalRoutes = authorized => {
  const all = [
    {
      path: PATH.MESSAGES.COMPOSE,
      element: <DialogNewMessage/>,
      children: [],
    },
    {
      path: PATH.SETTINGS.DISPLAY,
      element: <Display/>,
      children: [],
    },
    {
      path: PATH.ALL,
      element: <></>,
    },
  ];

  return authorized ? all :
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
      ...all
    ];
}
