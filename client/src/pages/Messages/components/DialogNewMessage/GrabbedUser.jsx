import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Chip} from "@mui/material";
import PropTypes from "prop-types";
import {ACTIONS as MESSAGE_SEARCH_ACTIONS} from "@redux/message/search/action";

const GrabbedUser = ({user}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(MESSAGE_SEARCH_ACTIONS.deleteGrabbedUser({id: user.id}))
  };

  return (
    <Box sx={{padding: '5px'}}>
      <ChipWrapper
        avatar={<Avatar sx={{mr: '10px', width: '1.5rem', height: '1.5rem'}} src={user?.avatarImgUrl}/>}
        label={user?.name}
        variant="outlined"
        onDelete={handleDelete}/>
    </Box>
  );
}

const styles = ({theme}) => ({
  fontSize: '1rem',
});

const ChipWrapper = styled(Chip)(styles);

GrabbedUser.propTypes = {
  user: PropTypes.object,
}
export default GrabbedUser;
