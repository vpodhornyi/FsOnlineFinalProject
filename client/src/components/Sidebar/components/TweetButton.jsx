import React from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import {useSelector} from "react-redux";
import {getMainMenuState} from "../../../redux/business/menu/mainMenu/selector";
import useMediaQuery from "@mui/material/useMediaQuery";

const TweetButton = () => {
    const {themeColor} = useSelector(getMainMenuState);

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