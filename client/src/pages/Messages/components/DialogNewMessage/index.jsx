import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import Header from "./Header";
import IconByName from "@components/icons/IconByName";
import SearchTextField from "./SearchTextField";
import NewMessageLoading from "./NewMessageLoading";

const Index = () => {
  return (
    <BoxWrapper>
      <Header/>
      <Box sx={{position: 'relative', width: '100%'}}>
        <IconByName iconName='SearchOutlined'/>
        <SearchTextField/>
        <NewMessageLoading/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',

  '& > .MuiBox-root > .MuiSvgIcon-root': {
    position: 'absolute',
    top: 4,
    left: 17,
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
