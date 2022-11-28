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
  SING_IN: {
    ROOT: '/auth/sing-in',
    FIRST_STEP: 'login',
    SECOND_STEP: 'password',
  },
  SING_UP: '/auth/sing-up',
  NO_MATCHES: '/:user_tag/*',
  ALL: '*',
}
