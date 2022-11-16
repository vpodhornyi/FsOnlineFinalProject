import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import StartMessage from "./StartMessage";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <StartMessage/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  padding: '5px 15px',
  borderTop: '1px solid #DDDFE2',
  backgroundColor: 'rgba(255,255,255, 1)',
});

export default Index;
