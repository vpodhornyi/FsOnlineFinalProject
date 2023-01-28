import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {IconByName} from "@components";

const Header = () => {

  return (
    <BoxWrapper>
      <Search>
        <Box className='SearchIconWrapper'>
          <IconByName iconName='SearchOutlined'/>
        </Box>
        <StyledInputBase
          placeholder="Search Twitter"
          inputProps={{'aria-label': 'search'}}
        />
      </Search>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
}));

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 20,
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: 'rgb(239, 243, 244)',
  width: '90%',

  '& .SearchIconWrapper': {
    position: 'absolute',
    top: 8,
    left: 17,
  },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default Header;
