import React from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import {sidebarMenu} from "../data/sidebarMenu";
import useMediaQuery from "@mui/material/useMediaQuery";

const TweetButton = () => {
    const {themeColor} = sidebarMenu;
    const matches = useMediaQuery("(max-width: 450px)")

    return (
        <Box sx={matches ? {position: "fixed", top: "85%", right: "10%"} : {marginTop: "20px"}}>
            <Avatar sx={{bgcolor: themeColor, width: 50, height: 50}}>
                <HistoryEduIcon/>
            </Avatar>
        </Box>
    );
};

export default TweetButton;