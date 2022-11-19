import React from "react";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import CollectBox from './components/CollectBox';
import SectionsBox from './components/SectionsBox';

const Home = () => {

  return (
    <BoxWrapper>
      <CollectBox/>
      <SectionsBox/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  display: 'flex',
  height: '100vh',
  width: '100%',
});
const BoxWrapper = styled(Box)(styles);

export default Home;
