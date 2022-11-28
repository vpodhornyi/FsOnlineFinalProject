import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {ACTIONS} from '@redux/message/action';
import {ModalPage} from '../../../components';
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import LoginHeader from "../components/LoginHeader";

const Login = ({background}) => {
  const dispatch = useDispatch();

  return (
    <ModalPage>
      <BoxWrapper>
        <LoginHeader background={background}/>
        <FirstStep background={background}/>
      </BoxWrapper>
    </ModalPage>
  )
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#ffffff',

  [theme.breakpoints.up('sm')]: {
    borderRadius: '16px',
    width: '600px',
    height: '650px',
  }
});

const BoxWrapper = styled(Box)(styles);

Login.propTypes = {
  background: PropTypes.object,
}

export default Login;
