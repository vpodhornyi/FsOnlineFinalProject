import {styled} from "@mui/material/styles";

const SectionDetails = styled('section')(({theme}) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'none',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    display: 'block'
  }
}));

export default SectionDetails;
