import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {useDispatch, useSelector} from 'react-redux';
import {getDialogState, getDialogComponent} from "@redux/dialog/selector";
import {ACTIONS} from "@redux/dialog/action";
import {styled} from "@mui/material/styles";

const FormDialog = () => {
  const {open, props} = useSelector(getDialogState);
  const Component = useSelector(getDialogComponent);
  const dispatch = useDispatch();

  return (
    <DialogWrapper
      open={open}
      onClose={() => dispatch(ACTIONS.closeDialog())}>
      <Component props={props}/>
    </DialogWrapper>
  );
}

const styles = ({theme}) => ({
  '& .MuiPaper-root': {
    margin: 0,
    padding: '2px 15px',
    position: 'relative',
    height: '100%',
    width: '100%',
    maxHeight: 'inherit',
    maxWidth: 'inherit',

    [theme.breakpoints.up(700)]: {
      borderRadius: 15,
      padding: 2,
      position: 'relative',
      height: 'auto',
      width: 'auto',
    },
  },
});

const DialogWrapper = styled(Dialog)(styles);

export default FormDialog;
