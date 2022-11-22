import { deepOrange } from "@mui/material/colors";
import { openDialog } from "@redux/dialog/action";
import CustomizationModal from "@components/CustomizationModal";
import {
  BOOKMARKS_ROUTE,
  EXPLORE_ROUTE,
  HOME_ROUTE,
  LISTS_ROUTE,
  MESSAGES_ROUTE,
  NOTIFICATIONS_ROUTE,
} from "../../../../utils/constants";

const textTheme = "#000000";
const colorTheme = deepOrange[500];

const INIT = {
  mainMenuStyle: {
    "& .MuiMenuItem-root": {
      borderRadius: 20,
      padding: 10,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 30,
    },
    "& .MuiTypography-root": {
      display: "flex",
      fontSize: 16,
    },
    "& .MuiTypography-root:hover > .MuiMenuItem-root": {
      borderRadius: 40,
      backgroundColor: "#E0E0E0",
      transition: "0.5s",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
    active: {
      "& .MuiListItemText-root": {
        display: "none",
      },
    },
  },
  footerStyles: {
    "& .sidebar__footer": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "16px",
      padding: "10px",
      borderRadius: 20,
    },
    "& .sidebar__footer: hover": {
      borderRadius: 40,
      backgroundColor: "#E0E0E0",
      transition: "0.5s",
      cursor: "pointer",
    },
    "& .footer__data": {
      margin: "0 10px 0 10px",
    },
    active: {
      "& .footer__data, & .footer__options": {
        display: "none",
      },
    },
  },
  buttonStyles: {
    backgroundColor: colorTheme,
    borderRadius: 30,
    marginTop: "15px",
    color: "white",
    padding: "10px",
    width: "170px",
    maxWidth: "100%",
    "&:hover": {
      backgroundColor: colorTheme,
    },
  },
  dropdownData: {
    head: "Settings",
    content: [
      {
        iconName: "DisplaySettingsOutlined",
        text: "Display",
      },
      {
        iconName: "LogoutOutlined",
        text: "Logout",
      },
    ],
  },
  navItems: [
    {
      iconName: "HomeOutlined",
      iconActive: "Home",
      text: "Home",
      color: textTheme,
      href: HOME_ROUTE,
    },
    {
      iconName: "ExploreOutlined",
      iconActive: "Explore",
      text: "Explore",
      color: textTheme,
      href: EXPLORE_ROUTE,
    },
    {
      iconName: "NotificationsOutlined",
      iconActive: "Notifications",
      text: "Notifications",
      color: textTheme,
      href: NOTIFICATIONS_ROUTE,
    },
    {
      iconName: "MailOutlineOutlined",
      iconActive: "Mail",
      text: "Messages",
      color: textTheme,
      href: MESSAGES_ROUTE,
    },
    {
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: "Bookmarks",
      color: textTheme,
      href: BOOKMARKS_ROUTE,
    },
    {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: "Lists",
      color: textTheme,
      href: LISTS_ROUTE,
    },
    {
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: "Profile",
      color: textTheme,
      href: "/userprofile",
    },
    {
      iconName: "DisplaySettingsOutlined",
      iconActive: "DisplaySettingsOutlined",
      text: "Display",
      color: textTheme,
      onclick: () => console.log("Hello"),
      // onclick: () => openDialog(CustomizationModal),
    },
  ],
  mediaNavItems: [
    {
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: "Bookmarks",
      color: textTheme,
      href: BOOKMARKS_ROUTE,
    },
    {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: "Lists",
      color: textTheme,
      href: LISTS_ROUTE,
    },
    {
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: "Profile",
      color: textTheme,
      href: "/userprofile",
    },
  ],
  textStyle: {
    active: {
      "& > span": {
        fontWeight: 700,
      },
    },
    marginLeft: "10px",
    color: textTheme,
  },
  themeColor: colorTheme,
};

export default (state = INIT) => state;
