import React, {useEffect} from "react";
import {useInView} from 'react-intersection-observer';
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const InViewElement = ({toggleVisible}) => {
  const {ref, inView} = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    toggleVisible(inView);
  }, [inView])

  return <Box sx={{width: '100%', p: '1px'}} ref={ref}/>;
}


InViewElement.propTypes = {
  toggleVisible: PropTypes.func,
}
export default InViewElement;
