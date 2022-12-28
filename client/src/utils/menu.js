import {PATH} from "./constants";

export const menu = (userTag, authorized, isChatSelected, chatId) => {

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
        text: 'Explorer',
      },
      {
        path: PATH.NOTIFICATIONS,
        iconName: "NotificationsOutlined",
        iconActive: "Notifications",
        text: 'Notifications',
      },
      {
        path: isChatSelected ? `${PATH.MESSAGES.ROOT}/${chatId}` : PATH.MESSAGES.ROOT,
        iconName: "MailOutlineOutlined",
        iconActive: "Mail",
        text: 'Messages',
      },
      {
        path: PATH.BOOKMARKS,
        iconName: "BookmarkBorderOutlined",
        iconActive: "Bookmark",
        text: 'Bookmarks',
      },
      {
        path: PATH.LISTS,
        iconName: "ArticleOutlined",
        iconActive: "Article",
        text: 'Lists',
      },
      {
        path: `/${userTag}`,
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
}
