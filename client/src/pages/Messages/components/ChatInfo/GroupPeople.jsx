import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Person from "./Person";
import Action from "./Action";
import {PATH} from "@utils/constants";

const GroupPeople = ({chat}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <BoxWrapper>
      <Typography
        sx={{padding: '11px 15px'}}
        fontSize='1.5rem'
        fontWeight='fontWeightBold'
        variant='h2'>
        People
      </Typography>
      <Box
      sx={{
        maxHeight: '40vh',
        overflowY: 'auto'
      }}>
        {chat.users.map(user => {
          return <Person key={user.key} user={user}/>
        })}
      </Box>
      <Box onClick={() => navigate(PATH.MESSAGES.addPeople(chat?.id), {state: {background: location}})}>
        <Action name='Add people'/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${theme.palette.border.main}`,
}));

GroupPeople.propTypes = {
  chat: PropTypes.object,
}
export default GroupPeople;
