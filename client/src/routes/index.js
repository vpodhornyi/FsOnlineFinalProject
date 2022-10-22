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
  }
];

export default routes;
