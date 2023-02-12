import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export default styled(Box)(({theme}) => ({
  '& .MuiFab-root': {
    width: '100%',
    height: '3.4rem',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: `1px solid ${theme.palette.border.main}`,
    margin: '10px 0',
    transitionDuration: '0.2s',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
    },

    '&:hover': {
      backgroundColor: 'rgba(15, 20, 25, 0.1);'
    }
  }
}));
