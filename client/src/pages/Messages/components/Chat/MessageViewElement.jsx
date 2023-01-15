import React, {useEffect} from "react";
import {Element} from 'react-scroll'
import {useInView} from 'react-intersection-observer';
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const MessageViewElement = ({toggleVisible, message, toggleModal, element: Foo, chat}) => {
  const {ref, inView} = useInView({
    threshold: 1,
  });

  useEffect(() => {
    toggleVisible(inView, message?.id);
  }, [inView])

  return (<BoxWrapper ref={ref}>
    <Element name={`elementName${message?.id}`}>
      {
        Foo &&  <Foo
          message={message}
          chat={chat}
          toggleModal={toggleModal}
        />
      }
    </Element>
  </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: 1,
}));

MessageViewElement.propTypes = {
  toggleVisible: PropTypes.func,
  message: PropTypes.object,
  toggleModal: PropTypes.func,
  element: PropTypes.func,
  chat: PropTypes.object,
}
export default MessageViewElement;
