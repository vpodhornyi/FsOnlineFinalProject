import React from "react";
import {Link, useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {PATH} from "../../../../utils/constants";


const GroupEdit = ({chat}) => {
  const location = useLocation();

  return (
    <BoxWrapper>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Link to={`${PATH.MESSAGES.participants(chat?.id)}`}>
          <Avatar sx={{mr: 2, width: '3.3rem', height: '3.3rem'}} src={chat?.avatarImgUrl}/>
        </Link>
        <Typography fontWeight='fontWeightBold'>{chat?.title}</Typography>
      </Box>
      <Link
        to={`${PATH.MESSAGES.groupInfo(chat?.id)}`}
        state={{background: location}}
      >
        <Typography color='primary'>Edit</Typography>
      </Link>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '11px 15px',
}));

GroupEdit.propTypes = {
  chat: PropTypes.object,
}
export default GroupEdit;
