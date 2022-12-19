import {
  AUTH_ROUTE,
  BOOKMARKS_ROUTE,
  EXPLORE_ROUTE,
  HOME_ROUTE,
  LISTS_ROUTE, LOGOUT_ROUTE,
  MESSAGES_ROUTE,
  NOTIFICATIONS_ROUTE, SUBSCRIBING_ROUTE
} from "../utils/constants";
import UserProfile from "../pages/UserProfile/UserProfile";
import Main from "../pages/Main";
import Auth from "../pages/Auth";
import Lists from "../pages/Lists/Lists";
import Explore from "../pages/Explore/Explore";
import Notifications from "../pages/Notifications/Notifications";
import Messages from "../pages/Messages";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import Subscribing from "../pages/Subscribing/Subscribing";

const routes = [
  {
    isPublic: true,
    isLogin: true,
    exact: true,
    path: AUTH_ROUTE,
    element: Auth,
  },
  {
    isPublic: false,
    exact: true,
    path: HOME_ROUTE,
    element: Main,
  },
  {
    isPublic: false,
    exact: true,
    path: EXPLORE_ROUTE,
    element: Explore,
  },
  {
    isPublic: false,
    exact: true,
    path: NOTIFICATIONS_ROUTE,
    element: Notifications,
  },
  {
    isPublic: false,
    exact: true,
    path: MESSAGES_ROUTE,
    element: Messages,
  },
  {
    isPublic: false,
    exact: true,
    path: BOOKMARKS_ROUTE,
    element: Bookmarks,
  },
  {
    isPublic: false,
    exact: true,
    path: LISTS_ROUTE,
    element: Lists
  },
  {
    isPublic: false,
    exact: true,
    path: "/:username",
    element: UserProfile,
  },
  {
    isPublic: false,
    exact: true,
    path: LOGOUT_ROUTE,
    element: Auth,
  },
  {
    isPublic: false,
    exact: true,
    path: SUBSCRIBING_ROUTE,
    element: Subscribing,
  }
];

export default routes;
