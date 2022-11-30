import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Dialog} from "@mui/material";
import NewMassageHeader from "./NewMassageHeader";
import IconByName from "@components/icons/IconByName";
import SearchTextField from "./SearchTextField";
import NewMessageLoading from "./NewMessageLoading";
import {getMessageSearchData} from "@redux/message/search/selector";
import FoundUser from "./FoundUser";
import GrabbedUser from "./GrabbedUser";
import {ModalPage} from '../../../../components';
import PropTypes from "prop-types";


const DialogNewMessage = ({open}) => {
  const {foundUsers, grabbedUsers} = useSelector(getMessageSearchData);

  return (
    <ModalPage element={
      <BoxWrapper>
        <NewMassageHeader/>
        <Box sx={{position: 'relative', width: '100%', borderBottom: '1px solid #DDDFE2',}}>
          <Box className='SearchIconWrapper'>
            <IconByName iconName='SearchOutlined'/>
          </Box>
          <SearchTextField/>
          <Box className='GrubbedUseBox'>
            {
              grabbedUsers.map(user => <GrabbedUser
                key={user?.id + user?.email}
                user={user}
              />)
            }
          </Box>
          <Box sx={{height: 2}}>
            <NewMessageLoading/>
          </Box>
        </Box>
        <Box className='FoundUsersBox'>
          {
            foundUsers.map(user => <FoundUser
              key={user?.id + user?.userTag}
              user={user}
            />)
          }
        </Box>
      </BoxWrapper>
    }/>
  );
}

const styles = ({theme}) => ({
  width: '50vh',
  height: '50vh',
  backgroundColor: '#fefefe',

  '& .SearchIconWrapper': {
    position: 'absolute',
    top: 4,
    left: 17,
  },

  '& .GrubbedUseBox': {
    padding: '5px 0',
    display: 'flex',
  },

  '& .FoundUsersBox': {
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

DialogNewMessage.propTypes = {
  open: PropTypes.bool,
}

export default DialogNewMessage;
