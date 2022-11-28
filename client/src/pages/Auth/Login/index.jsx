import React from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {ModalPage, CircularLoader} from '../../../components';
import LoginHeader from "../components/LoginHeader";

const Login = ({background}) => {
  const {loading} = useSelector(state => state.auth)

  return (
    <ModalPage>
      <BoxWrapper>
        {loading ? <CircularLoader/> : (
          <>
            <LoginHeader background={background}/>
            <Outlet/>
          </>
        )}
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
  },

  '& .StepTitle': {
    margin: '19px 0',
    fontSize: '2.2rem',
    fontWeight: theme.typography.fontWeightBold
  },

  '& .MuiBox-root .NextStepBtn': {
    backgroundColor: 'rgb(15, 20, 25) ',
    color: '#ffffff',

    '&:hover': {
      backgroundColor: 'rgb(39, 44, 48)',
    }
  }
});

const BoxWrapper = styled(Box)(styles);

Login.propTypes = {
  background: PropTypes.object,
}

export default Login;
