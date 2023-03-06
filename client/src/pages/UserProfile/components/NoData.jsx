import React from 'react';
import PropTypes from "prop-types";
import {BoxContainer} from "../pages/styledComponents";
import {Typography} from "@mui/material";

const NoData = ({text}) => {
    return (
        <BoxContainer>
            <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h2"}>{text}</Typography>
        </BoxContainer>
    );
};

NoData.propTypes = {
    text: PropTypes.string
}

export default NoData;