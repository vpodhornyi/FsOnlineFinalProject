import React, {useState} from 'react';
import {use, useDispatch, useSelector} from 'react-redux';
import {Box, Typography, TextField} from '@mui/material';
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

import DontHavAnAccount from '../components/DontHavAnAccount';
import {CustomFabButton} from "../../../components";


const SingInSecondStep = ({background, login = 'bob'}) => {
  const dispatch = useDispatch();
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
        <BtnWrapper>
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

SingInSecondStep.propTypes = {
  login: PropTypes.string,
  background: PropTypes.object,
}

export default SingInSecondStep;

