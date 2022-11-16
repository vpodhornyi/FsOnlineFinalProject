import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const Reaction = ({left}) => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <div>reaction</div>
    </BoxWrapper>);
}

Reaction.propTypes = {
  left: PropTypes.bool,
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  // justifyContent: 'flex-end'
});

export default Reaction;
