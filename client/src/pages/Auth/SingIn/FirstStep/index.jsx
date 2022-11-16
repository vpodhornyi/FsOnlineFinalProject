import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LogoIcon from '@components/icons/LogoIcon';
import {openDialog, closeDialog} from "@redux/dialog/action";
import {runSecondLoginStep} from "@redux/auth/action";
import {getLoginName} from "@redux/auth/selector";
import OrLine from '../../components/OrLine';
import CustomButton from '@components/CustomButton';
import ForgotPassword from '../ForgotPassword';

const MAIN_COLOR = '#1D9BF0';
const CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_STYLE = `
    background-color: #fff;
    color: #000;
    width: 100%;
    padding: 10px 15px;
    transition: all 200ms ease;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #DBE7F0;
    }`;
const CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_NAME = 'Sing in with Google';
const CUSTOM_BUTTON_NEXT_STYLE = `
    background-color: #000;
    width: 100%;
    padding: 10px 15px;
    transition: all 200ms ease;
    color: #fff;
      &:hover {
        background-color: #444;
    }`;
const CUSTOM_BUTTON_NEXT_NAME = 'Next';
const CUSTOM_BUTTON_FORGOT_PASSWORD_STYLE = `
    background-color: #fff;
    color: #000;
    width: 100%;
    padding: 10px 15px;
    transition: all 200ms ease;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #ddd;
    }`;
const CUSTOM_BUTTON_FORGOT_PASSWORD_NAME = 'Forgot password?';

const SingInFirstStep = () => {
  const [login, setLogin] = useState(useSelector(getLoginName));
  const dispatch = useDispatch();

  const onChange = (e) => {
    setLogin(e.target.value);
  }

  return (
    <Box sx={{padding: '0 100px', width: '380px', height: '95%',}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <IconButton aria-label="close" sx={{
          position: 'absolute',
          top: 5,
          left: 5,
        }}
                    onClick={() => dispatch(closeDialog())}>
          <CloseIcon/>
        </IconButton>
        <LogoIcon
          styles={{
            fontSize: 40,
            color: MAIN_COLOR
          }}
        />
      </Box>
      <Box sx={{
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Box>
          <DialogTitle sx={{pb: 7}}>Sign in to Twitter</DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12} sx={{pb: 1}}>
                <CustomButton
                  customStyle={CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_STYLE}
                  name={CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_NAME}
                  onclickAction={() => openDialog()}
                />
              </Grid>
              <Grid item xs={12}>
                <OrLine/>
              </Grid>
              <Grid item sx={{padding: '10px 0 30px 0'}}>
                <TextField
                  value={login}
                  onChange={e => onChange(e)}
                  sx={{width: '100%'}}
                  id="login"
                  label="Email or username"
                  variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item sx={{padding: '10px 0 30px 0'}}>
              <CustomButton
                customStyle={CUSTOM_BUTTON_NEXT_STYLE}
                name={CUSTOM_BUTTON_NEXT_NAME}
                onclickAction={() => runSecondLoginStep(login)}
              />
            </Grid>
            <Grid item sx={{padding: '10px 0 30px 0'}}>
              <CustomButton
                customStyle={CUSTOM_BUTTON_FORGOT_PASSWORD_STYLE}
                name={CUSTOM_BUTTON_FORGOT_PASSWORD_NAME}
                onclickAction={() => openDialog(ForgotPassword)}
              />
            </Grid>
            <DialogContentText sx={{fontSize: 15, pt: 5}}>
              {`Don't have an account? Sign up`}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Box>
    </Box>
  );
}

export default SingInFirstStep;
