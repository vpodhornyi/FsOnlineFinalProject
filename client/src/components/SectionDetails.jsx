import {styled} from "@mui/material/styles";

const SectionDetails = styled('section')(({theme}) => ({
  position: 'relative',
  height: '100%',
  display: 'none',
  borderRight: '1px solid #DDDFE2',
  flexGrow: 1,

  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 'auto'
  }
}));

export default SectionDetails;
