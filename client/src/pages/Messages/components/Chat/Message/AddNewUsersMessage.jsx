import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const AddNewUsersMessage = ({item}) => {
  const message = `${item?.user?.name} added ${item?.addedUsers?.map(u => ` ${u.name}`)}`;

  return (
    <BoxWrapper>
      <Typography variant={"body2"}>{message}</Typography>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  marginBottom: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

AddNewUsersMessage.propTypes = {
  item: PropTypes.object,
}
export default AddNewUsersMessage;
