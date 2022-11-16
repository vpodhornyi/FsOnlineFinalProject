import React from "react";
import Box from "@mui/material/Box";
import SectionNavigation from "./SectionNavigation";
import SectionDetails from "./SectionDetails";
import {styled} from "@mui/material/styles";


const SectionsBox = () => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <SectionNavigation/>
      <SectionDetails/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'none',

  [theme.breakpoints.up('md')]: {
    width: '100%',
    display: 'flex',
  },
});

export default SectionsBox;
