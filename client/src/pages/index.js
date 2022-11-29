import Home from './Home';
import Explore from './Explore';
import Notifications from './Notifications';
import Messages from './Messages';
import SelectMessage from './Messages/SelectMessage';
import Chat from './Messages/components/Chat';
import DialogNewMessage from './Messages/components/DialogNewMessage';
import ChatInfo from './Messages/components/ChatInfo';
import Bookmarks from './Bookmarks';
import Lists from './Lists';
import Root from './Root';
import UserProfile from './UserProfile';
import Auth from './Auth/Auth';
import Login from './Auth/SingIn/Login';
import Password from './Auth/SingIn/Password';
import ForgotPassword from './Auth/SingIn/ForgotPassword';
import SingUp from './Auth/SingUp/SingUp';
import Data from './Auth/SingUp/Data';
import CreateAccount from './Auth/SingUp/CreateAccount';

export {

  // auth log in, sing up
  Auth,
  Login,
  Password,
  ForgotPassword,
  SingUp,
  Data,
  CreateAccount,

  Root,
  Home,
  Explore,
  Notifications,

  // messages page
  Messages,
  SelectMessage,
  Chat,
  DialogNewMessage,
  ChatInfo,

  Bookmarks,
  Lists,
  UserProfile,
}
