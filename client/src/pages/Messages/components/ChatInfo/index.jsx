import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Header from "./Header";

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const StyledBox = styled(Box)(styles);

const Index = () => {


  return (
    <StyledBox>
      <Header/>
      <Box sx={{pt: 10}}>{'.............................TODO'}</Box>
    </StyledBox>);
}

export default Index;
