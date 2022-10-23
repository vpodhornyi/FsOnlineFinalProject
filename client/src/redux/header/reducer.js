const testColor = '#000000';

const INIT = {
  logo: {
    iconName: "Twitter",
    href: '/#/home'
  },
  navItems: [
    {
      iconName: "HomeOutlined",
      text: 'Home',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "ExploreOutlined",
      text: 'Explorer',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "NotificationsOutlined",
      text: 'Notifications',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "MailOutlineOutlined",
      text: 'Messages',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "BookmarkBorderOutlined",
      text: 'Bookmarks',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "ArticleOutlined",
      text: 'Lists',
      color: testColor,
      href: '/#/home'
    },
    {
      iconName: "PersonOutlined",
      text: 'Profile',
      color: testColor,
      href: '/#/home'
    },
  ],
  more: {
    iconName: "MoreHoriz",
    text: 'More',
    children: []
  }
};

export default (state = INIT) => state;
