import {styled} from "@mui/material/styles";


const MainContainer = styled('div')(({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('sm')]: {
    width: 600,
  },

  [theme.breakpoints.up('md')]: {
    width: 920,
  },

  [theme.breakpoints.up('lg')]: {
    width: 990,
  }
}));

export default MainContainer;
