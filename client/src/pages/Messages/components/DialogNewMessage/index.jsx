import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import Header from "./Header";
import IconByName from "@components/icons/IconByName";
import SearchTextField from "./SearchTextField";
import NewMessageLoading from "./NewMessageLoading";
import {getMessageData} from "@redux/message/selector";
import FoundUser from "./FoundUser";

const DialogNewMessage = () => {
  const dispatch = useDispatch();
  const {foundUsers} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <Header/>
      <Box sx={{position: 'relative', width: '100%'}}>
        <Box className='SearchIconWrapper'>
          <IconByName iconName='SearchOutlined'/>
        </Box>
        <SearchTextField/>
        <Box sx={{height: 2}}>
          <NewMessageLoading/>
        </Box>
      </Box>
      <Box className='FoundUsersWrapper'>
        {
          foundUsers.map(user => <FoundUser
            key={user?.id + user?.userTag}
            user={user}
          />)
        }
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',

  '& .SearchIconWrapper': {
    position: 'absolute',
    top: 4,
    left: 17,
  },

  '& .FoundUsersWrapper': {
    width: '100%',
    overflow: 'overlay',
    overflowX: 'hidden',
  },

  [theme.breakpoints.up(700)]: {
    width: '580px',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});


const BoxWrapper = styled(Box)(styles);

export default DialogNewMessage;
