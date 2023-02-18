import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";


const styles = () => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
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
