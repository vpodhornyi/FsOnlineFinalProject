import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {useDebouncedCallback} from "use-debounce";
import {Box, LinearProgress} from "@mui/material";
import PropTypes from "prop-types";

import IconByName from "@components/icons/IconByName";
import SearchTextField from "./SearchTextField";
import FoundUser from "./FoundUser";
import NewMassageHeader from "./NewMassageHeader";
import GrabbedUser from "./GrabbedUser";
import GroupButton from "./GroupButton";
import {ModalPage} from '../../../../components';
import {ACTIONS, searchUser, getPrivateChatByUsersId} from "@redux/chat/action";
import {PATH} from "@utils/constants";
import {getRandomKey} from '@utils';
import {CHAT_TYPE} from '@utils/constants';

const Element = ({isGroup}) => {
  const {NEW_GROUP, NEW_PRIVATE} = CHAT_TYPE;
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authUser} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [foundedUsers, setFoundedUsers] = useState([]);
  const [grabbedUsers, setGrabbedUsers] = useState([]);
  const debounced = useDebouncedCallback(async text => {
    if (text.trim() !== '') {
      setLoading(true);
      const users = await dispatch(searchUser({text}));
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
      }
      const id = Date.now();

      if (entity.type === NEW_PRIVATE) {
        const guestUser = grabbedUsers[0];
        entity.guestUserId = guestUser.id;
        entity.authUserId = authUser.id;
        setLoading(true);
        const chat = await dispatch(getPrivateChatByUsersId({authUserId: authUser.id, guestUserId: guestUser.id}));

        if (chat?.id) {
          dispatch(ACTIONS.addExistChat({chat}));
          navigate(`${PATH.MESSAGES.ROOT}/${chat.id}`);
        } else {
          entity.id = id;
          entity.title = guestUser.name;
          entity.userTag = guestUser.userTag;
          entity.avatarImgUrl = guestUser.avatarImgUrl;
          dispatch(ACTIONS.setNewChat({entity}));
          navigate(`${PATH.MESSAGES.ROOT}/${id}`);
        }
        setLoading(false);

      } else {
        entity.id = id;
        entity.title = 'New group';
        entity.users = grabbedUsers;
        entity.authUserId = authUser.id;
        dispatch(ACTIONS.setNewChat({entity}));
        navigate(`${PATH.MESSAGES.ROOT}/${id}`);
      }
    }
  }

  return (
    <BoxWrapper>
      <NewMassageHeader isGroup={isGroup} isNext={!grabbedUsers.length} next={next}/>
      <Box sx={{position: 'relative', width: '100%', borderBottom: '1px solid rgb(207, 217, 222)',}}>
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
      {!isGroup && <GroupButton/>}
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

const UserSearch = ({isGroup}) => <ModalPage element={<Element isGroup={isGroup}/>}/>;

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: '#fefefe',
  paddingBottom: 20,

  '& .SearchIconWrapper': {
    position: 'absolute',
    top: 4,
    left: 17,
  },

  '& .GrubbedUsersBox': {
    padding: '5px 0',
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
}

UserSearch.propTypes = {
  isGroup: PropTypes.bool,
}

export default UserSearch;
