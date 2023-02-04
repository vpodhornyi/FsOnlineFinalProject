import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {useDebouncedCallback} from "use-debounce";
import {Box, LinearProgress} from "@mui/material";
import PropTypes from "prop-types";

import {IconByName} from "@components";
import SearchTextField from "./SearchTextField";
import FoundUser from "./FoundUser";
import NewMassageHeader from "./NewMassageHeader";
import GrabbedUser from "./GrabbedUser";
import GroupButton from "./GroupButton";
import {ModalPage} from '../../../../components';
import {ACTIONS, searchUser, getPrivateChatByUsersId, addPeopleToChat} from "@redux/chat/action";
import {PATH} from "@utils/constants";
import {getRandomKey} from '@utils';
import {CHAT_TYPE} from '@utils/constants';
import {getChatsData} from '@redux/chat/selector';

const Element = ({isGroup, isAdd}) => {
  const {NEW_GROUP, NEW_PRIVATE} = CHAT_TYPE;
  const inputRef = useRef();
  const dispatch = useDispatch();
  const {selectedChat, chatId} = useSelector(getChatsData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [foundedUsers, setFoundedUsers] = useState([]);
  const [grabbedUsers, setGrabbedUsers] = useState([]);
  const debounced = useDebouncedCallback(async text => {
    if (text.trim() !== '') {
      setLoading(true);
      const users = await dispatch(searchUser({text}));
      isAdd && users.forEach(u => u.isNotSelectable = selectedChat.users.find(us => us.id === u.id));
      setFoundedUsers(users);
      setLoading(false);
    } else {
      setFoundedUsers([]);
    }
  }, 500);

  const inputOnChange = (e) => {
    setText(() => e.target.value);
    debounced(e.target.value);
  }

  const grabUser = (user) => {
    if (!grabbedUsers.find(v => v.id === user.id)) {
      grabbedUsers.push(user);
    }
    setGrabbedUsers([...grabbedUsers]);
    setFoundedUsers([]);
    setText('')
    inputRef.current.focus();
  }

  const deleteGrabbedUser = (userId) => {
    const users = grabbedUsers.filter(v => v.id !== userId);
    setGrabbedUsers([...users]);
    inputRef.current.focus();
  }

  const next = async (isGroup) => {
    if (!!grabbedUsers.length) {
      const entity = {
        key: getRandomKey(),
        type: isGroup ? NEW_GROUP : grabbedUsers.length === 1 ? NEW_PRIVATE : NEW_GROUP,
        isNew: true,
      }
      const id = Date.now();

      if (entity.type === NEW_PRIVATE) {
        const guestUser = grabbedUsers[0];
        entity.guestUserId = guestUser.id;
        setLoading(true);
        const chat = await dispatch(getPrivateChatByUsersId({guestUserId: guestUser.id}));

        if (chat?.id) {
          dispatch(ACTIONS.addExistChat({chat}));
          navigate(PATH.MESSAGES.chat(chat.id));
        } else {
          entity.id = id;
          entity.title = guestUser.name;
          entity.userTag = guestUser.userTag;
          entity.avatarImgUrl = guestUser.avatarImgUrl;
          dispatch(ACTIONS.addNewPrivateChat(entity));
          dispatch(ACTIONS.setChatId({chatId: id}));
          navigate(PATH.MESSAGES.chat(id));

        }
        setLoading(false);

      } else {
        entity.id = id;
        entity.title = 'New group';
        entity.users = grabbedUsers;
        dispatch(ACTIONS.addNewGroupChat(entity));
        dispatch(ACTIONS.setChatId({chatId: id}));
        navigate(PATH.MESSAGES.chat(id));
      }
    }
  }

  const addPeople = () => {
    if (!!grabbedUsers.length) {
      const data = {
        chatId,
        usersIds: grabbedUsers.map(u => u.id),
      }
      dispatch(addPeopleToChat(data));
      navigate(PATH.MESSAGES.chatInfo(chatId));
    }
  }

  return (
    <BoxWrapper>
      <NewMassageHeader
        isAdd={isAdd}
        isGroup={isGroup}
        isNext={!grabbedUsers.length}
        next={next}
        addPeople={addPeople}/>
      <Box className='SearchFieldBox'>
        <Box className='SearchIconWrapper'>
          <IconByName color='primary' iconName='SearchOutlined'/>
        </Box>
        <SearchTextField text={text} onChange={inputOnChange} inputRef={inputRef}/>
        <Box className='GrubbedUsersBox'>
          {
            grabbedUsers.map(user => <GrabbedUser
              key={user?.key}
              user={user}
              deleteGrabbedUser={deleteGrabbedUser}
            />)
          }
        </Box>
        <Box sx={{height: 2}}>
          {loading && <LinearProgress color='primary' sx={{height: 2}}/>}
        </Box>
      </Box>
      {!isGroup && !isAdd && <GroupButton/>}
      <Box className='FoundUsersBox'>
        {
          foundedUsers.map(user => <FoundUser
            key={user?.key}
            user={user}
            grabUser={grabUser}
          />)
        }
      </Box>
    </BoxWrapper>
  );
}

const UserSearch = ({isGroup, isAdd}) => <ModalPage element={<Element isAdd={isAdd} isGroup={isGroup}/>}/>;

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.main,
  paddingBottom: 20,

  '& .SearchFieldBox': {
    position: 'relative',
    width: '100%',
    borderBottom: `1px solid ${theme.palette.border.main}`
  },

  '& .SearchIconWrapper': {
    position: 'absolute',
    top: 4,
    left: 17,
  },

  '& .GrubbedUsersBox': {
    display: 'flex',
    flexWrap: 'wrap',
  },

  '& .FoundUsersBox': {
    width: '100%',
    overflow: 'overlay',
    overflowX: 'hidden',
  },

  [theme.breakpoints.up('sm')]: {
    borderRadius: '16px',
    width: '580px',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

Element.propTypes = {
  isGroup: PropTypes.bool,
  isAdd: PropTypes.bool,
}

UserSearch.propTypes = {
  isGroup: PropTypes.bool,
  isAdd: PropTypes.bool,
}

export default UserSearch;
