import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {openDialog} from "@redux/dialog/action";
import CustomButton from '../../../../components/CustomButton';
import SignUpFirstStep from '../FirstStep';

const CUSTOM_BUTTON_Sing_UP_STYLE = `
    background-color: #000;
    color: #fff;
      &:hover {
        background-color: #444;
    }`;
const CUSTOM_BUTTON_Sing_UP_NAME = 'Sing up';

const SingUpSecondStep =  () => {
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <IconButton aria-label="close" sx={{
          position: 'absolute',
          top: 5,
          left: 5,
          transform: 'rotate(180deg)',
        }}
                    onClick={() => dispatch(openDialog(SignUpFirstStep))}>
          <ArrowRightAltIcon/>
        </IconButton>
        <DialogTitle sx={{padding: '4px 10px'}}>Step 2 of 3</DialogTitle>
      </Box>
      <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box>
          <DialogTitle>Create your account</DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12} sx={{padding: '10px 0'}}>
                <TextField sx={{width: '100%'}} id="name" label="Name" variant="outlined"/>
              </Grid>
              <Grid item sx={{padding: '10px 0'}}>
                <TextField id="email" sx={{width: '100%'}} label="Email" variant="outlined"/>
              </Grid>
              <Grid item sx={{padding: '10px 0'}}>
                <TextField id="birthDate" sx={{width: '100%'}} label="Birth date" variant="outlined"/>
              </Grid>
            </Grid>
          </DialogContent>
        </Box>
        <Box>
          <DialogContent>
            <DialogContentText sx={{fontSize: 14, pb: 3}}>
              By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will
              be able to find you by email or phone number when provided · Privacy Options
            </DialogContentText>
            <CustomButton
              customStyle={CUSTOM_BUTTON_Sing_UP_STYLE}
              name={CUSTOM_BUTTON_Sing_UP_NAME}
              onclickAction={() => openDialog()}
            />
          </DialogContent>
        </Box>
      </Box>
    </>
  );
};

export default SingUpSecondStep;
