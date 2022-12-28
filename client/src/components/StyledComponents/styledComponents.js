import {styled} from "@mui/system";
import Button from "@mui/material/Button";
import React from "react";
import {Typography} from "@mui/material";

export const userProfileSecondaryFontColor = "rgb(83, 100, 113)";


export const StyledDarkButton = styled(props => (<Button {...props}/>))(() => ({
    "&": {
        height: "35px",
        alignSelf: "flex-end",
        backgroundColor: "rgb(15, 20, 25)",
        borderRadius: 40,
        color: "white"
    },
    "&:hover": {
        backgroundColor: "rgb(39, 44, 48)",
    },
    "&:disabled": {
        cursor: "pointer",
        backgroundColor: "rgba(39, 44, 48, 0.4)",
        color: "white"
    }
}));

export const StyledLightButton = styled(props => (<Button {...props}></Button>))(() => ({
    "&": {
        height: "35px",
        alignSelf: "flex-end",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 40,
        color: "rgb(15, 20, 25)",
        border: "1px solid black"
    },
}));

export const StyledTypography = styled(props => (<Typography {...props}/>))(() => ({
    "&": {
        color: userProfileSecondaryFontColor,
    },
    "&: hover": {
        textDecoration: "underline",
        cursor: "pointer",
    }
}));