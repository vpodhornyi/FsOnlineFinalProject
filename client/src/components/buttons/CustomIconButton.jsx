import React from "react";
import IconsByName from "@components/icons/IconByName";
import {IconButton, Box} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const CustomIconButton = ({name, size = 'medium', disabled = false, iconSize, color}) => {
  return (
      <Box className='CustomIconButtonWrapper'>
        <StyledIconButton color={color} size={size} disabled={disabled}>
          <IconsByName iconName={name} iconSize={iconSize}/>
        </StyledIconButton>
      </Box>
  )
};

const StyledIconButton = styled(IconButton)({
  padding: '11px !important',

  '& .MuiTouchRipple-root': {
    display: 'none',
  },
});

CustomIconButton.propTypes = {
  iconColor: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  iconSize: PropTypes.string,
  color: PropTypes.string,
}

export default CustomIconButton;
