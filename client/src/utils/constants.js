export const AUTH_ROUTE = "/";
export const HOME_ROUTE = "/home";
export const EXPLORE_ROUTE = "/explore";
export const NOTIFICATIONS_ROUTE = "/notifications";
export const MESSAGES_ROUTE = "/messages";
export const LISTS_ROUTE = "/lists";
export const BOOKMARKS_ROUTE = "/bookmarks";
export const LOGOUT_ROUTE = "/logout";

export const PATH = {
  ROOT: '/',
  HOME: '/home',
  EXPLORE: '/explore',
  NOTIFICATIONS: '/notifications',
  MESSAGES: {
    ROOT: '/messages',
    CHAT: ':id',
    CHAT_INFO: ':id/info',
    COMPOSE: '/messages/compose'
  },
  BOOKMARKS: '/bookmarks',
  LISTS: '/lists',
  USER_PROFILE: '/:user_tag',
  LOGIN: '/i/flow/login',
  SING_UP: '/i/flow/sing-up',
  NO_MATCHES: '/:user_tag/*',
  ALL: '*'
}
