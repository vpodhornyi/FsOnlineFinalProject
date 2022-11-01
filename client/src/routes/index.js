import {lazy} from "react";
import {
  AUTH_ROUTE,
  BOOKMARKS_ROUTE,
  EXPLORE_ROUTE,
  HOME_ROUTE,
  LISTS_ROUTE, LOGOUT_ROUTE,
  MESSAGES_ROUTE,
  NOTIFICATIONS_ROUTE
} from "../utils/constants";

const routes = [
  {
    isPublic: true,
    isLogin: true,
    exact: true,
    path: AUTH_ROUTE,
    element: lazy(() => import("@pages/Auth")),
  },
  {
    isPublic: false,
    exact: true,
    path: HOME_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: EXPLORE_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: NOTIFICATIONS_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: MESSAGES_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: BOOKMARKS_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: LISTS_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/user_name",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: LOGOUT_ROUTE,
    element: lazy(() => import("@pages/Main")),
  },
];

export default routes;
