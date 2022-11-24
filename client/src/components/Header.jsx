import {styled} from "@mui/material/styles";

const Header = styled('header')(({theme}) => ({
  display: 'none',

  [theme.breakpoints.up('xs')]: {
    flexGrow: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'end',
  },

  [theme.breakpoints.up('sm')]: {
    flexGrow: 1,
  },
}));

export default Header;
