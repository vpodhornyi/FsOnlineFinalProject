import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import IconByName from "@components/icons/IconByName";
import PropTypes from "prop-types";

const ScrollDownButton = ({visible}) => {

  return (
    <BoxWrapper className='ScrollDownButton'>
      <IconByName color='primary' iconName='ArrowDownwardOutlined'/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  cursor: 'pointer',
  position: 'absolute',
  right: 50,
  bottom: 80,
  backgroundColor: '#ffffff',
  padding: '5px 15px',
  borderRadius: 24,
  boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 8px, rgb(101 119 134 / 25%) 0px 1px 3px 1px',
  transition: '0.4s',
  // opacity: 0.3,

  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  }
});

const BoxWrapper = styled(Box)(styles);

ScrollDownButton.propTypes = {
  visible: PropTypes.bool,
}

export default ScrollDownButton;
