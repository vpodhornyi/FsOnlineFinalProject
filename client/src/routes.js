import {lazy} from 'react';
import {ACTIONS} from './redux/auth/action';


/*const foo = [
  {
    path: '/home',
    element: lazy(() => import(`@pages/Home`)),
  },
  {
    path: '/explore',
    element: lazy(() => import(`@pages/Explore`)),
  },
  {
    path: '/profile',
    element: lazy(() => import(`@pages/Profile`)),
    children: [
      {
        path: "/list",
        element: lazy(() => import(`@pages/List`)),
      },
    ],
  },
  {
    path: "*",
    element: lazy(() => import(`@pages/NoMatch`)),
  },
]*/


const data = {
  Root: {
    route: {
      path: '/',
      isPublic: true,
    }
  },
  Home: {
    route: {
      path: '/home',
      isPublic: false,
    },
    menu: {
      iconName: "HomeOutlined",
      iconActive: "Home",
      text: 'Home',
    }
  },
  Explore: {
    route: {
      path: '/explore',
      isPublic: true,
    },
    menu: {
      isPublic: true,
      iconName: "ExploreOutlined",
      iconActive: "Explore",
      text: 'Explorer',
    }
  },
  Notification: {
    route: {
      path: "/notifications",
    },
    menu: {
      iconName: "NotificationsOutlined",
      iconActive: "Notifications",
      text: 'Notifications',
    }
  },
  Messages: {
    route: {
      path: "/messages",
    },
    menu: {
      iconName: "MailOutlineOutlined",
      iconActive: "Mail",
      text: 'Messages',
    }
  },
  Bookmarks: {
    route: {
      path: "/bookmarks",
    },
    menu: {
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: 'Bookmarks',
    }
  },
  List: {
    route: {
      path: "/vpodhornyi/lists",
    },
    menu: {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: 'Lists',
    }
  },
  Profile: {
    route: {
      path: "/vpodhornyi",
      isPublic: true,
    },
    menu: {
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: 'Profile',
    }
  }
}

const resData = {
  route: key => ({
    path: data[key].route.path,
    page: data[key].route.page = lazy(() => import(`@pages/${key}`)),
  }),
  menu: key => ({
    path: data[key]?.route?.path,
    iconName: data[key]?.menu?.iconName,
    iconActive: data[key]?.menu?.iconActive,
    text: data[key]?.menu?.text,
  })
}

export const getRefData = (authorized, type) => {
  return Object.keys(data).reduce((acc, key) => {
    const res = resData[type](key);

    if (authorized) {
      data[key][type] && acc.push(res);
    } else {
      data[key][type]?.isPublic && acc.push(res);
    }

    return acc;
  }, []);
}

export const createRoutes = (store) => {
  const authorized = store.getState().auth.authorized;
  store.dispatch(ACTIONS.setRoutes({routes: getRefData(authorized, 'route')}));
  store.dispatch(ACTIONS.setMenu({menu: getRefData(authorized, 'menu')}));
}
