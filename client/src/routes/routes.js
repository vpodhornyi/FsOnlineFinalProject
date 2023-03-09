import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  Home,
  Explore,
  Messages,
  Chat,
  ChatInfo,
  Bookmarks,
  CreateAccount,
  SelectMessage,
  Lists,
  UserProfile,
  UserSearch,
  Auth,
  Login,
  Password,
  ForgotPassword,
  SingUp,
  UserData,
  Participants,
  GroupEditPage,
  Navigation,
  Search,
} from "../pages";
import { PATH } from "../utils/constants";
import { DeleteTweet, Display, TweetForm, PrimaryHeader } from "../components";
import TweetModal from "../components/tweetComponents/TweetModal";
import ModalImg from "../components/tweetComponents/ModalImg";
import Tweets from "../pages/Home/Tweets";
import Loading from "../components/Loader/Loading";
import { TweetPage } from "../components/tweetComponents/TweetPage";
import { themeStyles } from "../utils/theme";
import Subscribing from "../pages/Subscribing/Subscribing";
import EditProfile from "../pages/UserProfile/pages/EditProfile";
import Likes from "../pages/UserProfile/pages/Likes";
import TweetReplies from "../pages/UserProfile/pages/TweetReplies";
import PageHeader from "../components/PageHeader/PageHeader";

const BREAKPOINTS_VALUES = themeStyles().breakpoints.values;
const lazyLoading = (path) => {
  const LazyElement = lazy(() => import(path));
  return <LazyElement />;
};

export const mainRoutes = (width, authorized) => {
  const isMiddle = width > BREAKPOINTS_VALUES.md;

  return authorized
    ? [
        {
          path: PATH.ROOT,
          element: <Navigate to={PATH.HOME} />,
        },

        {
          path: PATH.HOME,
          element: <Home />,
          children: [
            {
              index: true,
              element: (
                <>
                  <PrimaryHeader
                    pageElement={<PageHeader page={"Home"} />}
                    isBack={false}
                  />
                  <TweetForm />
                  <Suspense fallback={<Loading />}>
                    <Tweets />{" "}
                  </Suspense>
                </>
              ),
            },
            { path: PATH.TWEET.TWEET_PAGE, element: <TweetPage /> },
          ],
        },
        {
          path: PATH.SEARCH,
          element: <Search />,
          children: [],
        },
        {
          path: PATH.EXPLORE,
          element: <Explore />,
          children: [],
        },

        {
          path: PATH.MESSAGES.ROOT,
          element: <Messages isMiddle={isMiddle} />,
          children: isMiddle
            ? [
                {
                  index: true,
                  element: <SelectMessage />,
                },
                {
                  path: PATH.MESSAGES.CHAT,
                  element: <Chat />,
                  children: [
                    {
                      path: PATH.MESSAGES.CHAT_INFO,
                      element: <ChatInfo />,
                    },
                    {
                      path: PATH.MESSAGES.PARTICIPANTS,
                      element: <Participants />,
                    },
                  ],
                },
              ]
            : [
                {
                  index: true,
                  element: <Navigation />,
                },
                {
                  index: true,
                  element: <SelectMessage />,
                },
                {
                  path: PATH.MESSAGES.CHAT,
                  element: <Chat />,
                  children: [
                    {
                      path: PATH.MESSAGES.CHAT_INFO,
                      element: <ChatInfo />,
                    },
                    {
                      path: PATH.MESSAGES.PARTICIPANTS,
                      element: <Participants />,
                    },
                  ],
                },
              ],
        },
        {
          path: PATH.BOOKMARKS,
          element: <Bookmarks />,
          children: [],
        },
        {
          path: PATH.LISTS,
          element: <Lists />,
          children: [],
        },
        {
          path: PATH.USER_PAGE.USER_PROFILE,
          element: <UserProfile />,
          children: [
            {
              path: PATH.USER_PAGE.LIKES,
              element: <Likes />,
            },
            {
              path: PATH.USER_PAGE.TWEET_REPLIES,
              element: <TweetReplies />,
            },
          ],
        },
        {
          path: PATH.USER_PAGE.FOLLOWERS,
          element: <Subscribing />,
          children: [],
        },
        {
          path: PATH.USER_PAGE.FOLLOWINGS,
          element: <Subscribing />,
          children: [],
        },
        {
          path: PATH.NO_MATCHES,
          element: <>Not Found PAGE</>,
        },
      ]
    : [
        {
          path: PATH.ROOT,
          element: <Navigate to={PATH.EXPLORE} />,
        },
        {
          path: PATH.EXPLORE,
          element: <Explore />,
          children: [],
        },
        {
          path: PATH.USER_PAGE.USER_PROFILE,
          element: <UserProfile />,
          children: [
            {
              path: PATH.USER_PAGE.LIKES,
              element: <Likes />,
            },
            {
              path: PATH.USER_PAGE.TWEET_REPLIES,
              element: <TweetReplies />,
            },
          ],
        },
        {
          path: PATH.USER_PAGE.FOLLOWERS,
          element: <Subscribing />,
          children: [],
        },
        {
          path: PATH.USER_PAGE.FOLLOWINGS,
          element: <Subscribing />,
          children: [],
        },
        {
          path: PATH.NO_MATCHES,
          element: <>Not Found PAGE</>,
        },
      ];
};

export const modalRoutes = (authorized) => {
  return authorized
    ? [
        {
          path: PATH.MESSAGES.COMPOSE,
          element: <UserSearch isGroup={false} />,
          children: [],
        },
        {
          path: PATH.MESSAGES.COMPOSE_GROUP,
          element: <UserSearch isGroup={true} />,
          children: [],
        },
        {
          path: PATH.MESSAGES.ADD_PEOPLE,
          element: <UserSearch isAdd={true} />,
          children: [],
        },
        {
          path: PATH.MESSAGES.GROUP_INFO,
          element: <GroupEditPage />,
        },
        {
          path: PATH.SETTINGS.DISPLAY,
          element: <Display />,
          children: [],
        },

        {
          path: PATH.TWEET.DELETE,
          element: <DeleteTweet />,
          children: [],
        },
        {
          path: PATH.SETTINGS.PROFILE,
          element: <EditProfile />,
          children: [],
        },
        {
          path: PATH.TWEET.REPLY,
          element: <TweetModal />,
          children: [],
        },
        {
          path: PATH.TWEET.IMG,
          element: <ModalImg />,
          children: [],
        },

        {
          path: PATH.ALL,
          element: <></>,
        },
      ]
    : [
        {
          path: PATH.AUTH.ROOT,
          element: <Auth />,
          children: [
            {
              path: PATH.AUTH.SING_IN.LOGIN,
              element: <Login />,
            },
            {
              path: PATH.AUTH.SING_IN.PASSWORD,
              element: <Password />,
            },
            {
              path: PATH.AUTH.SING_IN.FORGOT_PASSWORD,
              element: <ForgotPassword />,
            },
            {
              path: PATH.AUTH.SING_UP.ROOT,
              element: <SingUp />,
            },
            {
              path: PATH.AUTH.SING_UP.SET_DATA,
              element: <UserData />,
            },
            {
              path: PATH.AUTH.SING_UP.CREATE_ACCOUNT,
              element: <CreateAccount />,
            },
          ],
        },
        {
          path: PATH.ALL,
          element: <></>,
        },
      ];
};
