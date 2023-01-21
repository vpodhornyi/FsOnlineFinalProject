import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";


const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  // justifyContent: 'flex-end'
});


const BoxWrapper = styled(Box)(styles);

const Reaction = ({left}) => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <div>reaction</div>
    </BoxWrapper>);
}

Reaction.propTypes = {
  left: PropTypes.bool,
}

export default Reaction;
