import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {getMessageSearchData} from "@redux/message/search/selector";

import IconByName from "@components/icons/IconByName";
import SearchTextField from "./SearchTextField";
import NewMessageLoading from "./NewMessageLoading";
import FoundUser from "./FoundUser";
import NewMassageHeader from "./NewMassageHeader";
import GrabbedUser from "./GrabbedUser";
import {ModalPage} from '../../../../components';

const Element = () => {
  const {foundUsers, grabbedUsers} = useSelector(getMessageSearchData);

  return (
    <BoxWrapper>
      <NewMassageHeader/>
      <Box sx={{position: 'relative', width: '100%', borderBottom: '1px solid rgb(239, 243, 244)',}}>
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
  );
}

const DialogNewMessage = () => <ModalPage element={<Element/>}/>;

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: '#fefefe',
  paddingBottom: 20,

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

  [theme.breakpoints.up('sm')]: {
    borderRadius: '16px',
    width: '580px',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const BoxWrapper = styled(Box)(styles);

export default DialogNewMessage;
