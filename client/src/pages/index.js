import Home from './Home/Home';
import Explore from './Explore/Explore';
import Notifications from './Notifications/Notifications';
import Messages from './Messages/Messages';
import Navigation from './Messages/components/Navigation/Navigation';
import SelectMessage from './Messages/SelectMessage';
import Chat from './Messages/components/Chat/Chat';
import UserSearch from './Messages/components/UserSearch/UserSearch';
import ChatInfo from './Messages/components/ChatInfo/ChatInfo';
import Participants from './Messages/components/Participants/Participants';
import GroupEditPage from './Messages/components/GroupEditPage';
import Bookmarks from './Bookmarks/Bookmarks';
import Lists from './Lists/Lists';
import UserProfile from './UserProfile/UserProfile';
import Auth from './Auth/Auth';
import Login from './Auth/SingIn/Login';
import Password from './Auth/SingIn/Password';
import ForgotPassword from './Auth/SingIn/ForgotPassword';
import SingUp from './Auth/SingUp/SingUp';
import UserData from './Auth/SingUp/UserData';
import CreateAccount from './Auth/SingUp/CreateAccount';

export {

  // auth log in, sing up
  Auth,
  Login,
  Password,
  ForgotPassword,
  SingUp,
  UserData,
  CreateAccount,

  Home,
  Explore,
  Notifications,

  // messages page
  Messages,
  Navigation,
  SelectMessage,
  Chat,
  UserSearch,
  ChatInfo,
  Participants,
  GroupEditPage,

  Bookmarks,
  Lists,
  UserProfile,
}
