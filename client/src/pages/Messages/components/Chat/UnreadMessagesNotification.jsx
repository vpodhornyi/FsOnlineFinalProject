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
  padding: '3px 0',
  backgroundColor: 'rgb(247, 249, 249)',
  marginBottom: 10,

  '& .MuiTypography-root': {
    textAlign: 'center',
  }
}));

UnreadMessagesNotification.propTypes = {
  item: PropTypes.object,
}
export default UnreadMessagesNotification;
