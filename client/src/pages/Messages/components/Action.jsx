import React from "react";
import {styled} from "@mui/material/styles";
import {useLocation, useNavigate} from "react-router-dom";
import {Typography, Box} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton} from "../../../components";
import {PATH} from "../../../utils/constants";

const Action = ({title, description, btnName}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledBox>
      <Box>
        <Typography className='Title' variant='h2'>{title}</Typography>
        <Typography className='Description' sx={{pb: 3, pt: 1}} variant='body1'>
          {description}
        </Typography>
        <Box onClick={() => navigate(PATH.MESSAGES.COMPOSE, {state: {background: location}})}>
          <CustomFabButton className={'WriteMessage'} name={btnName}/>
        </Box>
      </Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  paddingTop: 20,
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',

  '& .Title': {
    fontWeight: theme.typography.fontWeightBold,
  },

  '& .Description': {
    fontSize: '0.9rem'
  },

  '& .WriteMessage': {
    padding: '0 40px',
    backgroundColor: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.secondary,
    },

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.textWhite,
    }
  },

  '& > .MuiBox-root': {
    width: '320px'
  }

});

const StyledBox = styled(Box)(styles);

Action.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  btnName: PropTypes.string,
}

export default Action;
