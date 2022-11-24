import {styled} from "@mui/material/styles";

const Main = styled('main')(({theme}) => ({
  flexGrow: 1,
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    flexGrow: 2,
  },

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  }
}));


export default Main;
