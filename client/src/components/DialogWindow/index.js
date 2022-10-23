import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useDispatch, useSelector} from 'react-redux';
import {getDialogState, getDialogComponent} from "@redux/dialog/selector";
import {closeDialog} from "@redux/dialog/action";

export default function FormDialog() {
  const {open} = useSelector(getDialogState);
  const Component = useSelector(getDialogComponent);
  const dispatch = useDispatch();
  const matches = useMediaQuery('(max-width:700px)');
  const dialogStyle = matches ? {
    style: {padding: '2px 15px', position: 'relative', height: '100%'}
  } : {
    style: {borderRadius: 15, padding: 2, position: 'relative', height: '70%'}
  }

  return (
    <Dialog
      fullScreen={matches}
      PaperProps={dialogStyle}
      open={open}
      onClose={() => dispatch(closeDialog())}>
      <Component/>
    </Dialog>
  );
}
