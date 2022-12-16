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
  AUTH: {
    ROOT: '/auth',
    SING_IN: {
      LOGIN: 'sing-in/login',
      PASSWORD: 'sing-in/password',
      FORGOT_PASSWORD: 'sing-in/forgot-password',
    },
    SING_UP: {
      ROOT: 'sing-up',
      SET_DATA: 'sing-up/data',
      CREATE_ACCOUNT: 'sing-up/create',
    },
  },
  NO_MATCHES: '/:user_tag/*',
  SETTINGS: {
    DISPLAY: '/settings/display'
  },
  TWEET: {
    ROOT:"/tweet",
    DELETE: '/tweet/:id',
    REPLY:'/tweet/reply/:id',
  },
  ALL: '*',
};

