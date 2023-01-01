import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import IconByName from "@components/icons/IconByName";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getChatsData} from "@redux/chat/selector";

const ScrollDownButton = ({visible}) => {
  const {countUnreadMessages} = useSelector(getChatsData);

  return visible || countUnreadMessages ? (
    <BoxWrapper className='ScrollDownButton'>
      <Box sx={{position: 'relative'}}>

      </Box>
      <IconByName color='primary' iconName='ArrowDownwardOutlined'/>
    </BoxWrapper>) : null;
}

const styles = ({theme}) => ({
  cursor: 'pointer',
  position: 'absolute',
  right: 50,
  top: -55,
  backgroundColor: '#ffffff',
  padding: '5px 15px',
  borderRadius: 24,
  boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 8px, rgb(101 119 134 / 25%) 0px 1px 3px 1px',
  transition: '0.3s',

  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  }
});

const BoxWrapper = styled(Box)(styles);

ScrollDownButton.propTypes = {
  visible: PropTypes.bool,
}

export default ScrollDownButton;
