import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {DIALOG_ACTIONS} from "@redux/dialog/action";
import OrLine from '../../components/OrLine';
import CustomButton from '../../../../components/CustomButton';

const MAIN_COLOR = '#1D9BF0';
const CUSTOM_BUTTON_SEARCH_STYLE = `
    background-color: #000;
    color: #fff;
      &:hover {
        background-color: #444;
    }`;
const CUSTOM_BUTTON_SERCH_NAME = 'Search';

export default () => {
  const dispatch = useDispatch();
  const {openDialog, closeDialog} = DIALOG_ACTIONS;

  return (
    <Box sx={{padding: '0 100px', width: '400px', height: '100%',}}>
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
        <TwitterIcon sx={{fontSize: 40, color: MAIN_COLOR}}/>
      </Box>
      <DialogTitle sx={{pb: 5}}>Find your Twitter account</DialogTitle>
      <DialogContent sx={{
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box>
          <Grid>
            <Grid item sx={{padding: '10px 0 20px 0'}}>
              <TextField id="fogotPasswordData" sx={{width: '100%'}} label="Enter your email or username" variant="outlined"/>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid item sx={{padding: '10px 0 30px 0'}}>
            <CustomButton
              customStyle={CUSTOM_BUTTON_SEARCH_STYLE}
              name={CUSTOM_BUTTON_SERCH_NAME}
              onclickAction={() => openDialog()}
            />
          </Grid>
        </Box>
      </DialogContent>
    </Box>
  );
}
