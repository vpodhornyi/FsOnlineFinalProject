import React from "react";
import {styled} from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from "@mui/material/Box";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 20,
  border: '1px solid #DDDFE2',
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBox = () => {
  return (
    <Box sx={{
      padding: '11px'
    }}>
      <Search>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{'aria-label': 'search'}}
        />
      </Search>
    </Box>
  );
}

export default SearchBox;
