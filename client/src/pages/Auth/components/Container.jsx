import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export default styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 'o 30px 46px 30px',
  width: '100%',

  [theme.breakpoints.up('xs')]: {
    minWidth: '380px',
    maxWidth: '380px',
  }
}));

