import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Action from "../Messages/components/Action";


const ACTION_TITLE = 'Click notifications to hide';
const ACTION_DESCRIPTION = 'Clicked notifications will be marked as "read" and will not be shown during you next session in this "notifications" section';
const ACTION_BTN_NAME = 'mark as seen';

const SelectNotification = () => {




  return (
    <StyledBox>
      <Action
        title={ACTION_TITLE}
        description={ACTION_DESCRIPTION}
        // btnName={ACTION_BTN_NAME}
      />
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

const StyledBox = styled(Box)(styles);

export default SelectNotification;
