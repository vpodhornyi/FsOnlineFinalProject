import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {Searchbar} from "../../components/Searchbar";

const Header = () => {

  return (
      <BoxWrapper>
        <Searchbar isExplore={true}/>
      </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  marginTop: '30px',
}));

export default Header;