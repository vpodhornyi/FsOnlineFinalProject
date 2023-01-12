import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useInView} from 'react-intersection-observer';
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const OnBottomElement = ({toggleVisible}) => {
  const {ref, inView} = useInView({
    threshold: 0.1,
    // triggerOnce: true,
  });

  useEffect(() => {
    toggleVisible(inView);
  }, [inView])

  return (
    <BoxWrapper ref={ref}></BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: 1,
}));

OnBottomElement.propTypes = {
  toggleVisible: PropTypes.func,
}
export default OnBottomElement;
