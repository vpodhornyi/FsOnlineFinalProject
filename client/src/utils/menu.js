import {PATH} from "./constants";

export const menu = (userTag, authorized, isChatSelected, countUnreadMessages, chatId) => {

  return authorized ? [
      {
        path: PATH.HOME,
        iconName: "HomeOutlined",
        iconActive: "Home",
        text: 'Home',
      },
      {
        path: PATH.EXPLORE,
        iconName: "ExploreOutlined",
        iconActive: "Explore",
        text: 'Explore',
      },
      {
        path: PATH.NOTIFICATIONS,
        iconName: "NotificationsOutlined",
        iconActive: "Notifications",
        text: 'Notifications',
      },
      {
        path: isChatSelected ? PATH.MESSAGES.chat(chatId) : PATH.MESSAGES.ROOT,
        iconName: "MailOutlineOutlined",
        iconActive: "Mail",
        isBadge: true,
        badgeContent: countUnreadMessages,
        text: 'Messages',
      },
      {
        path: PATH.BOOKMARKS,
        iconName: "BookmarkBorderOutlined",
        iconActive: "Bookmark",
        text: 'Bookmarks',
      },
      {
        path: PATH.lists(userTag),
        iconName: "ArticleOutlined",
        iconActive: "Article",
        text: 'Lists',
      },
      {
        path: PATH.userProfile(userTag),
        iconName: "PersonOutlined",
        iconActive: "Person",
        text: 'Profile',
      },
      {
        path: PATH.SETTINGS.DISPLAY,
        iconName: "DisplaySettingsOutlined",
        iconActive: "DisplaySettingsOutlined",
        text: "Display",
        modalPage: true,
      }
    ] :
    [
      {
        path: PATH.EXPLORE,
        iconName: "ExploreOutlined",
        iconActive: "Explore",
        text: 'Explorer',
      },
    ]
};

export const mobileMenu = (userTag, isDrawer, isChatSelected, countUnreadMessages, chatId) => {

  return isDrawer ? [
    {
      path: PATH.userProfile(userTag),
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: 'Profile',
    },
    {
      path: PATH.BOOKMARKS,
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: 'Bookmarks',
    },
    {
      path: PATH.lists(userTag),
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: 'Lists',
    },
    {
      path: PATH.SETTINGS.DISPLAY,
      iconName: "DisplaySettingsOutlined",
      iconActive: "DisplaySettingsOutlined",
      text: "Display",
      modalPage: true,
    }
  ] : [
    {
      path: PATH.HOME,
      iconName: "HomeOutlined",
      iconActive: "Home",
      text: 'Home',
    },
    {
      path: PATH.EXPLORE,
      iconName: "ExploreOutlined",
      iconActive: "Explore",
      text: 'Explorer',
    },
    {
      path: PATH.NOTIFICATIONS,
      iconName: "NotificationsOutlined",
      iconActive: "Notifications",
      text: 'Notifications',
    },
    {
      path: isChatSelected ? PATH.MESSAGES.chat(chatId) : PATH.MESSAGES.ROOT,
      iconName: "MailOutlineOutlined",
      iconActive: "Mail",
      isBadge: true,
      badgeContent: countUnreadMessages,
      text: 'Messages',
    }
  ]
}
