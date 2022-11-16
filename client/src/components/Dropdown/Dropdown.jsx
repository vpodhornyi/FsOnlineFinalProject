import React from 'react';
import PropTypes from "prop-types";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomMenuItem from "../Sidebar/components/CustomMenuItem";

const Dropdown = ({head, content}) => {
    return (
        <Accordion sx={{boxShadow: "none"}}>
            <AccordionSummary
                sx={{"& ": {padding: "0"}}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{head}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{"& ": {padding: "0"}, "& .MuiButtonBase-root": {padding: "0"}}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {content.map(({iconName, text}) =>
                        <CustomMenuItem iconName={iconName} text={text} key={text}/>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

Dropdown.propTypes = {
    head: PropTypes.string,
    content: PropTypes.array,
}

export default Dropdown;