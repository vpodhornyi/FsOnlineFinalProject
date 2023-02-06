import {styled} from "@mui/system";
import Button from "@mui/material/Button";
import React from "react";
import {Box, Typography} from "@mui/material";
import Container from "@mui/material/Container";

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

export const StyledLoadContainer = styled(props => (<Container {...props}/>))(() => ({
    "&": {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export const BoxContainer = styled(props => (<Box {...props}/>))(() => ({
    "&": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        maxWidth: "70%",
        margin: "0 auto"
    }
}));