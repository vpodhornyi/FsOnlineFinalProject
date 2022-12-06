import React from "react";
import Action from "../Action";

const ACTION_TITLE = 'Welcome to your inbox!';
const ACTION_DESCRIPTION = ' Drop a line, share Tweets and more with private conversation between you and others on Twitter';
const ACTION_BTN_NAME = 'Write a message';

const ActionWelcome = () => {

  return (
    <Action
      title={ACTION_TITLE}
      description={ACTION_DESCRIPTION}
      btnName={ACTION_BTN_NAME}
    />
  );
}

export default ActionWelcome;
