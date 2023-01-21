import React, {useEffect, useState} from "react";
import {Element} from 'react-scroll';
import {useInView} from 'react-intersection-observer';
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const MessageViewElement = ({toggleVisible, message, toggleModal, activeMessageId,
                              element: Message, chat, messageBoxClick, nextMessage}) => {
  const [sameMessage, setSameMessage] = useState(false);

  const {ref, inView} = useInView({
    threshold: 1,
  });

  useEffect(() => {
    toggleVisible(inView, message?.id);
    isTheSameMessage();
  }, [inView, nextMessage])

  const isTheSameMessage = () => {
    if (nextMessage && (message?.user?.id === nextMessage?.user?.id)) {
      console.log();
      const messageCreatedAt = new Date(message.createdAt).getTime() + 60000 * 2;
      const nextMessageCreatedAt = new Date(nextMessage.createdAt).getTime();

      if (messageCreatedAt > nextMessageCreatedAt) {
        setSameMessage(true);
      }
    }
  }

  return (<BoxWrapper ref={ref}>
    <Element name={`elementName${message?.id}`}>
      {
        Message && <Message
          message={message}
          chat={chat}
          toggleModal={toggleModal}
          messageBoxClick={messageBoxClick}
          sameMessage={sameMessage}
          activeMessageId={activeMessageId}
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
  messageBoxClick: PropTypes.func,
  nextMessage: PropTypes.any,
  activeMessageId: PropTypes.number,
}
export default MessageViewElement;
