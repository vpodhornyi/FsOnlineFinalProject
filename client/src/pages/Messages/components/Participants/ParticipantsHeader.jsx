import React from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import {Typography, Box} from "@mui/material";

import CustomIconButton from "@components/buttons/CustomIconButton";
import {StickyHeader} from '@components';


const ChatInfoHeader = ({chat}) => {
  const navigate = useNavigate();

  return (
    <StyledStickyHeader>
      <Box onClick={() => navigate(-1)}>
        <CustomIconButton name='ArrowBackOutlined' title='Back' color='text'/>
      </Box>
      <Typography variant='h2'>People</Typography>
    </StyledStickyHeader>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  padding: '10px 14px 10px 5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  '& .MuiTypography-root': {
    fontSize: '1.3rem',
    marginLeft: 20,
    fontWeight: theme.typography.fontWeightBold
  }
});

const StyledStickyHeader = styled(StickyHeader)(styles);

ChatInfoHeader.propTypes = {
  chat: PropTypes.object,
}
export default ChatInfoHeader;
