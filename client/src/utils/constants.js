export const AUTH_ROUTE = "/";
export const HOME_ROUTE = "/home";
export const EXPLORE_ROUTE = "/explore";
export const NOTIFICATIONS_ROUTE = "/notifications";
export const MESSAGES_ROUTE = "/messages";
export const LISTS_ROUTE = "/lists";
export const BOOKMARKS_ROUTE = "/bookmarks";
export const LOGOUT_ROUTE = "/logout";
export const FOLLOWERS_ROUTE = "/:user_tag/followers"
export const FOLLOWINGS_ROUTE = "/:user_tag/followings"

export const SEARCH = "/searchPage"

export const PATH = {
  ROOT: '/',
  HOME: '/home',
  SEARCH: '/searchPage',
  EXPLORE: '/explore',
  NOTIFICATIONS: '/notifications',
  MESSAGES: {
    ROOT: '/messages',
    CHAT: '/messages/:id',
    chat: id => `/messages/${id}`,
    CHAT_INFO: `/messages/:id/info`,
    chatInfo: id => `/messages/${id}/info`,
    GROUP_INFO: `/messages/:id/group-info`,
    groupInfo: id => `/messages/${id}/group-info`,
    PARTICIPANTS: `/messages/:id/participants`,
    participants: id => `/messages/${id}/participants`,
    ADD_PEOPLE: `/messages/:id/add`,
    addPeople: id => `/messages/${id}/add`,
    COMPOSE: '/messages/compose',
    COMPOSE_GROUP: '/messages/compose/group',
  },
  BOOKMARKS: '/i/bookmarks',
  LISTS: `/lists`,
  lists: userTag =>  `/lists`,
  USER_PAGE: {
    USER_PROFILE: '/:user_tag',
    userProfile: userTag => `/${userTag}`,
    FOLLOWERS: '/:user_tag/followers',
    followers: userTag => `/${userTag}/followers`,
    FOLLOWINGS: '/:user_tag/followings',
    followings: userTag => `/${userTag}/followings`,
    TWEET_REPLIES: '/:user_tag/with_replies',
    tweetReplies: userTag => `/${userTag}/with_replies`,
    LIKES: '/:user_tag/likes',
    likes: userTag => `/${userTag}/likes`,
  },
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
    DISPLAY: '/settings/display',
    PROFILE: '/settings/profile'
  },
  TWEET: {
    ROOT: "/tweet",
    DELETE: '/tweet/:id',
    REPLY: '/tweet/reply/:id',
    IMG: '/tweet/img',
    TWEET_PAGE:'/home/tweet-page/:id',
    tweetPage:  (id)=>`/home/tweet-page/${id}`
  },
  ALL: '*',
};

export const CHAT_TYPE = {
  PRIVATE: 'PRIVATE',
  NEW_PRIVATE: 'NEW_PRIVATE',
  GROUP: 'GROUP',
  NEW_GROUP: 'NEW_GROUP',
}
