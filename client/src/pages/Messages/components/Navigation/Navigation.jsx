import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

import ChatsList from "./ChatsList";
import {CircularLoader} from "../../../../components";

const Navigation = () => {
  const {user} = useSelector(state => state.user);
  const {loading} = useSelector(state => state.message);

  return (
    <BoxWrapper>
      {loading && <CircularLoader/>}
      {user?.id && <ChatsList user={user}/>}
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  position: 'relative',
});

const BoxWrapper = styled(Box)(styles);

export default Navigation;
