import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Header from "./Header";


const Index = () => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <Header/>
      <Box sx={{pt: 10}}>{'.............................TODO'}</Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'

});

export default Index;
