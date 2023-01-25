import React, {useContext} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import {IconByName, LogoIcon} from '../../../components';
import {PATH} from '../../../utils/constants';
import {BackgroundContext} from "../../../utils/context";
import {ACTIONS} from '@redux/auth/action';

const LoginHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const handleClick = () => {
    dispatch(ACTIONS.resetData());
    navigate(background?.pathname || PATH.ROOT);
  }
  return (
    <BoxWrapper>
      <IconButton className='Close' aria-label="close" onClick={handleClick}>
        <IconByName iconName='Close'/>
      </IconButton>
      <LogoIcon/>
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)(({theme}) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '5px 0',

  '& .Close': {
    position: 'absolute',
    top: 6,
    left: -15,
  },

  '& > .IconByName': {
    fontSize: '2.5rem',
    color: theme.palette.primary.main
  }
}));

export default LoginHeader;
