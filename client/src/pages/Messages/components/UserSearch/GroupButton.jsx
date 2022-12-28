import React, {useContext} from "react";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";

import {PATH} from "@utils/constants";
import {CustomIconButton} from "@components";
import {BackgroundContext} from "@utils/context";

const GroupButton = () => {
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);

  return (
    <BoxWrapper onClick={() => navigate(PATH.MESSAGES.COMPOSE_GROUP, {state: {background}})}>
      <Box className='GroupIConWrapper'>
        <CustomIconButton color='primary' name='Groups'/>
      </Box>
      <Typography color='primary' fontWeight='fontWeightBold'>Create a group</Typography>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px 20px',
  margin: '2px 0',
  borderBottom: '1px solid rgb(239, 243, 244)',

  '& .GroupIConWrapper': {
    width: '2.7rem',
    height: '2.7rem',
    border: '1px solid rgb(207, 217, 222)',
    borderRadius: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  '&:hover': {
    backgroundColor: 'rgb(247, 249, 249)',
  },

}));

export default GroupButton;
