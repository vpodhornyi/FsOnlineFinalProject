import React from "react";
import IconsByName from "@components/icons/IconByName";
import {IconButton, Tooltip, Box} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const CustomIconButton = ({name, title, size = 'medium', disabled = false, iconSize, color}) => {
  const StyledIconButton = styled(IconButton)(styles);
  return (
    // <Tooltip title={title}>
    <Box>
      <StyledIconButton color={color} size={size} disabled={disabled}>
        <IconsByName iconName={name} iconSize={iconSize}/>
      </StyledIconButton>
    </Box>
    // </Tooltip>
  )
};

CustomIconButton.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  iconSize: PropTypes.string,
  color: PropTypes.string,
}

const styles = ({theme}) => ({
  '& .MuiTouchRipple-root': {
    display: 'none'
  },
});

export default CustomIconButton;
