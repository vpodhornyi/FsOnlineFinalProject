import React from "react";
import {Box} from "@mui/material";
import {Searchbar} from "../../components/Searchbar";

const Header = () => {

    return (
        <Box sx={{width: "100%", padding: "40px 0 0 0"}}>
            <Searchbar isExplore={false}/>
        </Box>
    );
}

export default Header;
