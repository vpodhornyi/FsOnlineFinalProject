import React from "react";
import {styled} from "@mui/material/styles";
import {Outlet} from "react-router-dom";

const ColumnWrapper = () => (
  <StyledDiv className='ColumnWrapper'>
    <Outlet/>
  </StyledDiv>
);

const StyledDiv = styled('div')(({theme}) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('sm')]: {
    flexGrow: 2,
  },

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  }
}));


export default ColumnWrapper;
