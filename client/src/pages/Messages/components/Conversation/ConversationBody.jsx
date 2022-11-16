import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import UserInfo from "./UserInfo";
import Message from "./Message";
import ScrollDownButton from "./ScrollDownButton";
import {getMessageData} from "@redux/message/selector";

const Conversation = () => {
  const [visible, setVisible] = useState(false);
  const BoxWrapper = styled(Box)(styles);
  const overlayRef = useRef();
  const dispatch = useDispatch();
  const {conversationData} = useSelector(getMessageData);

  const onBottom = () => {
    const height = overlayRef.current.offsetHeight;
    overlayRef.current.scroll(0, height + 250);
  }

  useEffect(() => {
    onBottom();
  }, []);

  const onScrollEvent = () => {
    const scroll = overlayRef.current.scrollTop;
    const offsetHeight = overlayRef.current.offsetHeight;
    const scrollHeight = overlayRef.current.scrollHeight;
    const maxScroll = scrollHeight - offsetHeight;

    if (scroll < maxScroll) {
      // setVisible(true);
    } else if (scroll === maxScroll) {
      // setVisible(false);
    }
  }

  return (
    <BoxWrapper>
      <Box ref={overlayRef} className='Overlay' onScroll={onScrollEvent}>
        <Box className='MessagesBox'>
          <UserInfo/>
          {conversationData.map(item => <Message key={item.key} left={!item.isAuth} text={item.text}/>)}
        </Box>
      </Box>
      {/*<Box onClick={onBottom}>*/}
      {/*  <ScrollDownButton/>*/}
      {/*</Box>*/}
      <Footer/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& > .Overlay': {
    overflow: 'overlay', overflowX: 'hidden', paddingRight: 15
  },

  '& > .MuiBox-root > .MessagesBox': {
    overflow: 'overlay', paddingLeft: 15, paddingRight: 15,
  }
});

export default Conversation;
