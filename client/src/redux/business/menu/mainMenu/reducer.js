const testColor = '#000000';

const INIT = {
  mainMenuStyle: {
    '& .MuiMenuItem-root': {
      borderRadius: 20,
      padding: 15,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 30
    },
    '& .MuiTypography-root': {
      display: 'flex',
      fontSize: 19
    },
    '& .MuiTypography-root:hover > .MuiMenuItem-root': {
      borderRadius: 40,
      backgroundColor: '#E0E0E0'
    },
    '& .MuiTouchRipple-root': {
      display: 'none'
    },
    active: {
      '& .MuiListItemText-root': {
        display: 'none',
      },
    }
  },
  navItems: [
    {
      iconName: "HomeOutlined",
      iconActive: "Home",
      text: 'Home',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "ExploreOutlined",
      iconActive: "Explore",
      text: 'Explorer',
      color: testColor,
      href: '/#/explore'
    },
    {
      iconName: "NotificationsOutlined",
      iconActive: "Notifications",
      text: 'Notifications',
      color: testColor,
      href: '/#/notifications'
    },
    {
      iconName: "MailOutlineOutlined",
      iconActive: "Mail",
      text: 'Messages',
      color: testColor,
      href: '/#/messages'
    },
    {
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: 'Bookmarks',
      color: testColor,
      href: '/#/bookmarks'
    },
    {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: 'Lists',
      color: testColor,
      href: '/#/lists'
    },
    {
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: 'Profile',
      color: testColor,
      href: '/#/user_name'
    },
  ],
  more: {
    iconName: "MoreHoriz",
    text: 'More',
    children: []
  },
  textStyle: {
    active: {
      '& > span': {
        fontWeight: 700
      }
    },
    marginLeft: 3,
    color: testColor
  }
};

export default (state = INIT) => state;
