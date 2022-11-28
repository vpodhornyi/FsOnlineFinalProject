import React from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {IconByName, LogoIcon} from '../../../components';
import PropTypes from "prop-types";
import {PATH} from '../../../utils/constants';

const LoginHeader = ({background}) => {
  const navigate = useNavigate();

  return (
    <BoxWrapper>
      <IconButton className='Close' aria-label="close" onClick={() => navigate(background?.pathname || PATH.ROOT)}>
        <IconByName iconName='Close'/>
      </IconButton>
      <LogoIcon/>
    </BoxWrapper>
  )
}

const styles = ({theme}) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '5px 0',

  '& .Close': {
    position: 'absolute',
    top: 5,
    left: 5,
  },

  '& > .IconByName': {
    fontSize: 40,
    color: theme.palette.primary.main
  }
});

LoginHeader.propTypes = {
  background: PropTypes.object,
}

const BoxWrapper = styled(Box)(styles);

export default LoginHeader;
