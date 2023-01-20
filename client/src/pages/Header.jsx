import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material";
import PropTypes from "prop-types";
import {StickyHeader} from "../components";

const Header = ({user, pageElement: PageElement}) => {
  const handleClick = () => {
    console.log('kuku');
  }

  return (
    <StyledStickyHeader>
      <StyledAvatar onClick={handleClick} src={user.avatarImgUrl}/>
      <PageElement/>
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

  '& .MessageTitle': {
    fontSize: '1.3rem',
    fontWeight: 600
  }
}));

Header.propTypes = {
  user: PropTypes.object,
  pageElement: PropTypes.func,
}
export default Header;
