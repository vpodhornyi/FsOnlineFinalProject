import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Box, Typography, TextField} from '@mui/material';
import {styled} from "@mui/material/styles";

import DontHavAnAccount from '../components/DontHavAnAccount';
import {CustomFabButton} from "../../../components";
import {authorize} from '@redux/auth/action';
import {BackgroundContext} from "../../../utils/context";

const SingInSecondStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const userName = useSelector(state => state.auth.loginName);
  const [password, setPassword] = useState('');

  const onChange = e => {
    setPassword(() => e.target.value);
  }

  return (
    <BoxWrapper>
      <Box>
        <Typography className='StepTitle' variant='h1'>{'Enter your password'}</Typography>
        <TextField
          value={userName}
          disabled={true}
          id="email"
          sx={{width: '100%'}}
          label="Email or username"
          variant="outlined"/>
        <TextField
          onChange={e => onChange(e)}
          value={password}
          id="password"
          sx={{width: '100%'}}
          label="Password"
          variant="outlined"/>
      </Box>
      <Box sx={{mb: 3}}>
        <BtnWrapper onClick={() => dispatch(authorize({login: userName, password, navigate, background}))}>
          <CustomFabButton className='NextStepBtn' name='Log in'/>
        </BtnWrapper>
        <DontHavAnAccount background={background}/>
      </Box>
    </BoxWrapper>
  );
};

const BoxWrapper = styled(Box)(({theme}) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& .MuiTextField-root': {
    margin: '10px 0',
  }

}))
const BtnWrapper = styled(Box)(({theme}) => ({

  '& .MuiFab-root': {
    width: '100%',
    height: 47,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: '1px solid #DDDFE2',
    margin: '10px 0',
    transitionDuration: '0.2s',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
    },

    '&:hover': {
      backgroundColor: 'rgba(15, 20, 25, 0.1);'
    }
  }
}));

export default SingInSecondStep;

