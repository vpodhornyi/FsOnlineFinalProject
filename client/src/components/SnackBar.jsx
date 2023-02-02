import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography, Snackbar} from "@mui/material";

import {ACTIONS} from '@redux/snack/action';

const SnackBar = () => {
  const {open, duration, vertical, horizontal, message} = useSelector(state => state.snack);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(ACTIONS.close());
  };

  return (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      key={vertical + horizontal}>
      <BoxWrapper>
        <Typography align="center">{message}</Typography>
      </BoxWrapper>
    </Snackbar>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: 10,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '5px',

  '& .MuiTypography-root': {
    color: theme.palette.common.textWhite,
  },
}));

export default SnackBar;
