import React from "react";
import {styled} from "@mui/material/styles";
import {Box, CircularProgress} from "@mui/material";

const Header = () => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <CircularProgress/>
    </BoxWrapper>
  )
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default Header;
