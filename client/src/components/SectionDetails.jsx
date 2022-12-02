import React from "react";
import {styled} from "@mui/material/styles";
import {Outlet, useOutlet} from "react-router-dom";
import PropTypes from "prop-types";

const SectionDetail = ({
                         Body = () => {
                         }
                       }) => {

  return (
    <>
      <StyledSection className='SectionDetail'>
        <Body/>
      </StyledSection>
      <Outlet/>
    </>
  );
}

const StyledSection = styled('section')(({theme}) => ({
  display: 'none',
  borderRight: '1px solid rgb(239, 243, 244)',
  flexGrow: 1,
  height: '100vh',
  position: 'sticky',
  top: 0,

  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 'auto'
  }
}));

SectionDetail.propTypes = {
  Body: PropTypes.func,
}

export default SectionDetail;
