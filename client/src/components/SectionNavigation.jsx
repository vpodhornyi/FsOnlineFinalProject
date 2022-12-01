import React from "react";
import {Routes, Route, Outlet} from "react-router-dom";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";


const SectionNavigation = ({
                             Body = () => {
                             }
                           }) => {
  return (
    <>
      <StyledSection className='SectionNavigation'>
        <Body/>
      </StyledSection>
      <Outlet/>
    </>
  )
};

const StyledSection = styled('section')(({theme}) => ({
  height: '100%',
  width: '100%',
  borderLeft: '1px solid rgb(239, 243, 244)',
  borderRight: '1px solid rgb(239, 243, 244)',

  [theme.breakpoints.up('md')]: {
    width: 320,
  },

  [theme.breakpoints.up('lg')]: {
    width: 390,
  },
}));

SectionNavigation.propTypes = {
  Body: PropTypes.func,
}

export default SectionNavigation;
