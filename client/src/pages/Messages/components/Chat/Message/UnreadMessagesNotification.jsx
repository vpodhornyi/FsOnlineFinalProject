import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const UnreadMessagesNotification = ({item}) => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Typography variant='body2'>Unread Messages</Typography>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.background[1],
  marginBottom: 5,

  '& .MuiTypography-root': {
    textAlign: 'center',
  }
}));

UnreadMessagesNotification.propTypes = {
  item: PropTypes.object,
}
export default UnreadMessagesNotification;
