import React, {lazy} from 'react';
import {ACTIONS} from './redux/auth/action';
import {
  Home,
  Explore,
  Notifications,
  Messages,
  Chat,
  SelectMessage,
  DialogNewMessage,
  ChatInfo,
  Bookmarks,
  Lists,
  UserProfile,
} from "./pages";

export function lazyLoadRoutes(path) {
  const LazyElement = lazy(() => import(`./pages${path}`));

  return (<LazyElement/>);
}


export const routes = (userTag) => [
  {
    path: "/home",
    element: <Home/>,
    children: [],
  },
  {
    path: "/explore",
    element: <Explore/>,
    children: [],
  },
  {
    path: "/notifications",
    element: <Notifications/>,
    children: [],
  },
  {
    path: "/messages",
    element: <Messages/>,
    children: [
      // {index: true, element: lazyLoadRoutes('/Messages/SelectMessage')},
      {
        index: true,
        element: <SelectMessage/>,
      },
      {
        path: ':id',
        element: <Chat/>,
      },
      {
        path: ':id/info',
        element: <ChatInfo/>,
      },
      {
        path: 'compose',
        element: <DialogNewMessage/>
      },
    ],
  },
  {
    path: "/bookmarks",
    element: <Bookmarks/>,
    children: [],
  },
  {
    path: `/${userTag}`,
    element: <UserProfile/>,
    children: [],
  },
  {
    path: "/lists",
    element: <Lists/>,
    children: [],
  },
];

export const menu = (userTag) => [
  {
    path: '/home',
    iconName: "HomeOutlined",
    iconActive: "Home",
    text: 'Home',
  },
  {
    path: '/explore',
    iconName: "ExploreOutlined",
    iconActive: "Explore",
    text: 'Explorer',
  },
  {
    path: "/notifications",
    iconName: "NotificationsOutlined",
    iconActive: "Notifications",
    text: 'Notifications',
  },
  {
    path: "/messages",
    iconName: "MailOutlineOutlined",
    iconActive: "Mail",
    text: 'Messages',
  },
  {
    path: "/bookmarks",
    iconName: "BookmarkBorderOutlined",
    iconActive: "Bookmark",
    text: 'Bookmarks',
  },
  {
    path: "/lists",
    iconName: "ArticleOutlined",
    iconActive: "Article",
    text: 'Lists',
  },
  {
    path: `/${userTag}`,
    iconName: "PersonOutlined",
    iconActive: "Person",
    text: 'Profile',
  }
]

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
      path: "/lists",
    },
    menu: {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: 'Lists',
    }
  },
  Profile: {
    route: {
      path: "/user_tag",
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
