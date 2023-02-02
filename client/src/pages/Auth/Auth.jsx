import React from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {ModalPage, CircularLoader} from './../../components';
import LoginHeader from "./components/LoginHeader";


const Element = () => {
  const {loading} = useSelector(state => state.auth);

  return <BoxWrapper>
    {loading && <CircularLoader size={40} styles={{borderRadius: '1.1rem'}}/>}
    <LoginHeader/>
    <Outlet/>
  </BoxWrapper>
};
const Auth = () => <ModalPage closable={false} element={<Element/>}/>;

const styles = ({theme}) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: '0 20px',

  [theme.breakpoints.up('sm')]: {
    borderRadius: '1.1rem',
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

    '& .MuiTypography-root': {
      color: '#ffffff',
    },

    '&:hover': {
      backgroundColor: 'rgb(39, 44, 48)',
    }
  }
});

const BoxWrapper = styled(Box)(styles);

export default Auth;
