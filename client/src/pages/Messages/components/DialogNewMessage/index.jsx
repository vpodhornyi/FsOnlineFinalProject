import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, TextField} from "@mui/material";
import Header from "./Header";
import IconByName from "@components/icons/IconByName";

const Index = () => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Header/>
      <IconByName iconName='SearchOutlined'/>
      <TextField id="standard-basic" placeholder="Search people" variant="standard" fullWidth/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',

  '& > .MuiSvgIcon-root': {
    position: 'absolute',
    top: 73,
    left: 17,
  },

  '& .MuiInputBase-root': {
    paddingLeft: 50,
    paddingBottom: 5,
    borderBottom: '1px solid #DDDFE2',

    '&:before': {
      content: 'none'
    },

    '&:after': {
      content: 'none'
    }
  },

  [theme.breakpoints.up(700)]: {
    width: '580px',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});


const BoxWrapper = styled(Box)(styles);

export default Index;
