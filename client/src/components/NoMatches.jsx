import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

const NoMatches = () => {

  return (
    <BoxWrapper>
      Page Not Found
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
});

const BoxWrapper = styled(Box)(styles);

export default NoMatches;
