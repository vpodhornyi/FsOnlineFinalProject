import {styled} from "@mui/material/styles";


const RootContainer = styled('div')(({theme}) => ({
  width: '100%',
  display: 'flex',
  position: 'relative',

  '& .MuiSnackbar-root': {
    bottom: '90px'
  }
}));

export default RootContainer;
