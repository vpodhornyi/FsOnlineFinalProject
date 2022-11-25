import {styled} from "@mui/material/styles";

const Main = styled('main')(({theme}) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('sm')]: {
    flexGrow: 2,
  },

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  }
}));


export default Main;
