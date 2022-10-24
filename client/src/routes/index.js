import {lazy} from "react";

const routes = [
  {
    isPublic: true,
    exact: true,
    path: "/",
    element: lazy(() => import("@pages/Auth")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/home",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/explore",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/notifications",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/messages",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/bookmarks",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/lists",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/user_name",
    element: lazy(() => import("@pages/Main")),
  },
];

export default routes;
