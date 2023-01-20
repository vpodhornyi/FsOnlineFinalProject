import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material";
import PropTypes from "prop-types";

import {StickyHeader, CustomIconButton} from "../components";

const PrimaryHeader = ({isBack = false, pageElement: PageElement}) => {
  const {authUser} = useSelector(state => state.user);
  const navigate = useNavigate();
  const handleClick = () => {
  }

  return (
    <StyledStickyHeader>
      {authUser?.id && !isBack && <StyledAvatar onClick={handleClick} src={authUser.avatarImgUrl}/>}
      {isBack && <Box sx={{mr: 3}} onClick={() => navigate(-1)}>
        <CustomIconButton name='ArrowBackOutlined' title='Back'/>
      </Box>}
      <PageElement user={authUser}/>
    </StyledStickyHeader>
  );
}

const StyledAvatar = styled(Avatar)(({theme}) => ({
  cursor: 'pointer',
  marginRight: 10,
  width: '2.5rem',
  height: '2.5rem',

  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
}));

const StyledStickyHeader = styled(StickyHeader)(({theme}) => ({
  padding: '10px 14px',
  height: '50px',
  display: 'flex',

  '& .HeaderTitle': {
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold,
  }
}));

PrimaryHeader.propTypes = {
  pageElement: PropTypes.func,
  isBack: PropTypes.bool,
}
export default PrimaryHeader;
