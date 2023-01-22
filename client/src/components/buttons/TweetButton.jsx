import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import IconByName from "../icons/IconByName";

const Index = () => {
  return (
    <BoxWrapper>
      <Box>
        <IconByName iconName='HistoryEdu'/>
        <Typography >Tweet</Typography>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  margin: '15px 0',
  display: 'flex',

  '& .MuiBox-root': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.textWhite,
    borderRadius: 40,
    padding: 15,
    cursor: 'pointer',

    [theme.breakpoints.up('xl')]: {
      width: '90%',
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.secondary,
    },

    "& .MuiSvgIcon-root": {
      fontSize: '2rem',

      [theme.breakpoints.up('xl')]: {
        display: 'none',
      }
    },

    "& .MuiTypography-root": {
      display: 'none',
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.textWhite,

      [theme.breakpoints.up('xl')]: {
        display: 'block',
      }
    },
  },
});

const BoxWrapper = styled(Box)(styles);

export default Index;
