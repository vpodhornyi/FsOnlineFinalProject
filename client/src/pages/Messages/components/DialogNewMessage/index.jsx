import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, TextField} from "@mui/material";
import Header from "./Header";


const styles = ({theme}) => ({
  width: '580px',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});


const BoxWrapper = styled(Box)(styles);

const Index = () => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Header/>
      <TextField id="standard-basic" placeholder="Search people" variant="standard" fullWidth/>
    </BoxWrapper>);
}

export default Index;
