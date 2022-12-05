import React, {Suspense, lazy} from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

// import ChatsList from "./ChatsList";
import {CircularLoader} from "../../../../components";

const ChatsList = lazy(() => import('./ChatsList'));
const Navigation = () => {
  const {loading} = useSelector(state => state.message);

  return (
    <BoxWrapper>
      <Suspense fallback={<CircularLoader/>}>
        <ChatsList/>
      </Suspense>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  // height: '100%',
  position: 'relative',
}));

export default Navigation;
