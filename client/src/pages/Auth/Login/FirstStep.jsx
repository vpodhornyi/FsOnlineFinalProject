import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Typography, TextField} from '@mui/material';
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

import OrLine from '../components/OrLine';
import {CustomFabButton} from '../../../components';
import {PATH} from "../../../utils/constants";

const SingInFirstStep = ({background}) => {
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    setLogin(() => e.target.value);
  }

  return (
    <BoxWrapper>
      <Typography className='FistStepTitle' variant='h1'>{"Sign in to Twitter"}</Typography>
      <BtnWrapper>
        <CustomFabButton className='GoogleSingIn' name='Sing in with Google'/>
      </BtnWrapper>
      <OrLine/>
      <TextField
        className='LoginField'
        value={login}
        onChange={e => onChange(e)}
        sx={{width: '100%'}}
        label="Email or username"
        variant="outlined"/>
      <BtnWrapper>
        <CustomFabButton className='Next' name='Next'/>
      </BtnWrapper>
      <BtnWrapper>
        <CustomFabButton name='Forgot password?'/>
      </BtnWrapper>
      <Typography className='SingUpTitle' variant='body1'>
        {"Don't have an account?"}
        <Link className='SingUpLink' to={PATH.SING_UP} state={{background}}>Sign up</Link>
      </Typography>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minWidth: '364px',
  maxWidth: '364px',
  paddingBottom: 46,
  paddingLeft: 30,
  paddingRight: 30,

  '& .LoginField': {
    margin: '10px 0'
  },

  '& .FistStepTitle': {
    margin: '19px 0',
    fontSize: '2.2rem',
    fontWeight: theme.typography.fontWeightBold
  },

  '& .MuiBox-root .Next': {
    backgroundColor: 'rgb(15, 20, 25) ',
    color: '#ffffff',

    '&:hover': {
      backgroundColor: 'rgb(39, 44, 48)',
    }
  },

  '& .SingUpTitle': {
    marginTop: 38,
  },

  '& .SingUpLink': {
    marginLeft: '10px',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }

}));
const BtnWrapper = styled(Box)(({theme}) => ({

  '& .MuiFab-root': {
    width: '100%',
    height: 34,
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

SingInFirstStep.propTypes = {
  background: PropTypes.object,
}

export default SingInFirstStep;
