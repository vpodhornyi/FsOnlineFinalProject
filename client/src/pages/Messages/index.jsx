import React from "react";
import {Outlet, useNavigate, useNavigation, redirect, useLocation} from 'react-router-dom';
import {SectionNavigation, SectionDetails, StickyHeader, CustomIconButton} from '../../components';
import Navigation from './components/Navigation';
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <StickyHeader sx={{
        padding: '10px 14px',

        '& .MessageTitle': {
          fontSize: '1.3rem',
          fontWeight: 600
        }
      }}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <StyledAvatar/>
          <Typography className='MessageTitle' variant='h2'>Messages</Typography>
        </Box>
        <Box onClick={() =>  navigate('/messages/compose')}>
          <CustomIconButton name='ForwardToInboxOutlined' title='New message'/>
        </Box>
      </StickyHeader>
      <Navigation/>
    </>);
}

const StyledAvatar = styled(Avatar)(({theme}) => ({
  cursor: 'pointer',
  marginRight: 10,
  width: '2.5rem',
  height: '2.5rem',

  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
}));

export default Index;
