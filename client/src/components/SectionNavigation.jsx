import {styled} from "@mui/material/styles";

const SectionNavigation = styled('section')(({theme}) => ({
  height: '100%',
  width: '100%',
  borderLeft: '1px solid #DDDFE2',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    width: 320,
  },

  [theme.breakpoints.up('lg')]: {
    width: 390,
  },
}));

export default SectionNavigation;
