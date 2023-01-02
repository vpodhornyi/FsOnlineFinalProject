import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import More from "./More";
import PropTypes from "prop-types";

const Action = ({toggleModal, message}) => {

  return (
    <BoxWrapper className='Actions'>
      <Box>
        <CustomIconButton
          color='greyAccent'
          name='FavoriteBorderOutlined'
          title='React'
          size='small'
          iconSize='small'/>
      </Box>
      <More toggleModal={toggleModal} message={message}/>
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
}

export default Action;
