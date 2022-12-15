import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {ACTIONS} from '@redux/message/action';

const Index = ({item}) => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>

    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

Index.propTypes = {
  item: PropTypes.object,
}
export default Index;
