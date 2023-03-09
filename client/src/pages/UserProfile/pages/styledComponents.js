import {styled} from "@mui/system";
import Button from "@mui/material/Button";
import React from "react";
import {Box, Typography} from "@mui/material";
import Container from "@mui/material/Container";

export const ThemeButtonDark = styled(props => (<Button {...props}/>))(({theme}) => ({
    "&": {
        height: "35px",
        alignSelf: "flex-end",
        borderRadius: 40,
        color: theme.palette.background.main,
        backgroundColor: theme.palette.text.main,
    },
    "&: disabled": {
        color: theme.palette.background.alpha
    }
}));

export const ThemeButtonLight = styled(props => (<Button {...props}/>))(({theme}) => ({
    "&": {
        height: "35px",
        alignSelf: "flex-end",
        borderRadius: 40,
        color: theme.palette.text.main,
        backgroundColor: theme.palette.background.main,
        border: `1px solid ${theme.palette.text.main}`
    },
    "&:hover": {
        borderColor: theme.palette.redAccent.secondary,
        color: theme.palette.redAccent.main,
        backgroundColor: theme.palette.redAccent.mainTransparent,
    }
}));

export const ThemeButtonLightNoHover = styled(Button)(({theme}) => ({
    "&": {
        height: "35px",
        alignSelf: "flex-end",
        borderRadius: 40,
        color: theme.palette.text.main || 'rgb(15, 20, 25)',
        backgroundColor: theme.palette.background.main || '#fff',
        border: `1px solid ${theme.palette.text.main || `rgb(15, 20, 25)`}`,
    }
}));

export const StyledTypography = styled(props => (<Typography {...props}/>))(({theme}) => ({
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
        alignItems: "center",
        marginTop: "25px"
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

export const TypographyBold = styled(Typography)(({theme}) => ({
    "&": {
        fontSize: "1.3rem",
        fontWeight: "bold"
    }
}))