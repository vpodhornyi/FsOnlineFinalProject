import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import More from "./More";
import PropTypes from "prop-types";

const Action = ({toggleModal, message, isRight = false}) => {

  return (
    <BoxWrapper className='Actions'>
      <Box>
        <CustomIconButton
          color='action'
          name='FavoriteBorderOutlined'
          title='React'
          size='small'
          iconSize='small'/>
      </Box>
      <More toggleModal={toggleModal} message={message} isRight={isRight}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  opacity: 0,
  padding: '0 5px'
}));

Action.propTypes = {
  toggleModal: PropTypes.func,
  message: PropTypes.object,
  isRight: PropTypes.bool,
}

export default Action;
