import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import ModalPage from "./ModalPage";

const Display = ({item}) => {
  const dispatch = useDispatch();

  return <ModalPage element={
    <BoxWrapper>
      DISPLAY SETTINGS ELEMENT
    </BoxWrapper>
  }/>
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
});

const BoxWrapper = styled(Box)(styles);

Display.propTypes = {
  item: PropTypes.object,
}
export default Display;
