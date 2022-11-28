import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {IconByName, LogoIcon} from '../../../components';
import {PATH} from '../../../utils/constants';
import {BackgroundContext} from "../../../utils/context";

const LoginHeader = () => {
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);

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
    fontSize: '3rem',
    color: theme.palette.primary.main
  }
});

const BoxWrapper = styled(Box)(styles);

export default LoginHeader;
