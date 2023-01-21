import React from "react";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {PATH} from "@utils/constants";

const LeaveChatMessage = ({item}) => {
  return (
    <BoxWrapper>
      <Link to={`${PATH.userProfile(item.user.userTag)}`}>
        <Avatar sx={{width: '3rem', height: '3rem'}} src={item.user.avatarImgUrl}/>
      </Link>
      <Typography sx={{mt: 2}} variant={"body2"}>{item?.user?.name} has been left the conversation</Typography>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  marginBottom: 10,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

LeaveChatMessage.propTypes = {
  item: PropTypes.object,
}
export default LeaveChatMessage;
