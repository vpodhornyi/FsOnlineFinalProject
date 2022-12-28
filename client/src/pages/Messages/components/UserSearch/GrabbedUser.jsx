import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Chip} from "@mui/material";
import PropTypes from "prop-types";

const GrabbedUser = ({user, deleteGrabbedUser}) => {

  return (
    <Box sx={{padding: '5px'}}>
      <ChipWrapper
        avatar={<Avatar sx={{mr: '10px', width: '1.5rem', height: '1.5rem'}} src={user?.avatarImgUrl}/>}
        label={user?.name}
        variant="outlined"
        onDelete={() => deleteGrabbedUser(user?.id)}/>
    </Box>
  );
}

const styles = ({theme}) => ({
  fontSize: '1rem',

  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,

    '&: hover': {
      color: theme.palette.primary.secondary,
    }
  }
});

const ChipWrapper = styled(Chip)(styles);

GrabbedUser.propTypes = {
  user: PropTypes.object,
  deleteGrabbedUser: PropTypes.func,
}
export default GrabbedUser;
