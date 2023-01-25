import React, {useContext} from "react";
import {useState} from "react";
import "./colorCustomization.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import "./backgroundCustomization.css"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {ThemeContext} from "../../utils/themeContext";

function BackgroundCustomization() {
    const {color, backgroundColor, setBackgroundColor} = useContext(ThemeContext);
    const [active, setActive] = useState();
    const handleColorChange = (newBackgroundColor) => {
        setBackgroundColor(newBackgroundColor);
    }
    return (
        <>
            <Box
                sx={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "3px",
                    paddingBottom: "8px",
                    paddingTop: "8px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    backgroundColor: "rgb(247, 249, 249)",
                    borderRadius: "10px"

                }}
            >
                <Box

                    sx={{
                        borderRadius: "3px",
                        minWidth: "120px",
                        margin: "4px",
                        backgroundColor: "rgb(239, 243, 244)",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                        paddingRight: "20px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-around",
                        fontWeight: "700",
                        fontSize: "1rem",
                        lineHeight: "20px",
                        alignItems: "center",
                        alignContent: "center",
                        borderColor: (backgroundColor === 'rgb(239, 243, 244)' ? color : "none"),
                        borderStyle: (backgroundColor === 'rgb(239, 243, 244)' ? "solid" : "none"),
                        borderWidth: (backgroundColor === 'rgb(239, 243, 244)' ? "2px" : "0px")
                    }}
                >
                    {backgroundColor === 'rgb(239, 243, 244)' ?
                        <span style={{backgroundColor: color, borderColor: color}}
                              className={["background-customization-check-active"]}>
                        <CheckOutlinedIcon fontSize="small" sx={{color: "white"}}/>
                    </span>
                        :
                        <span onClick={() => setBackgroundColor('rgb(239, 243, 244)')}
                              className={["background-customization-check-inactive"]}>
                    </span>
                    }

                    <p>Default</p>
                </Box>
                <Box
                    sx={{
                        borderRadius: "3px",
                        minWidth: "120px",
                        margin: "4px",
                        backgroundColor: "rgba(21, 32, 43)",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                        paddingRight: "20px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-around",
                        fontWeight: "700",
                        fontSize: "1rem",
                        lineHeight: "20px",
                        alignItems: "center",
                        alignContent: "center",
                        borderColor: (backgroundColor === 'rgba(21, 32, 43)' ? color : "none"),
                        borderStyle: (backgroundColor === 'rgba(21, 32, 43)' ? "solid" : "none"),
                        borderWidth: (backgroundColor === 'rgba(21, 32, 43)' ? "2px" : "0px")
                    }}
                >
                    {backgroundColor === 'rgba(21, 32, 43)' ?
                        <span style={{backgroundColor: color, borderColor: color}}
                              className={["background-customization-check-active"]}>
                        <CheckOutlinedIcon fontSize="small" sx={{color: "white"}}/>
                    </span>
                        :
                        <span onClick={() => setBackgroundColor('rgba(21, 32, 43)')}
                              className={["background-customization-check-inactive"]}>
                    </span>
                    }
                    <p style={{color: "white"}}>Dim</p>
                </Box>
                <Box
                    sx={{
                        borderRadius: "3px",
                        minWidth: "120px",
                        margin: "4px",
                        marginRight: "6px",
                        backgroundColor: "rgba(0, 0, 0)",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                        paddingRight: "4px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-around",
                        fontWeight: "700",
                        fontSize: "1rem",
                        lineHeight: "20px",
                        alignItems: "center",
                        alignContent: "center",
                        borderColor: (backgroundColor === 'rgba(0, 0, 0)' ? color : "none"),
                        borderStyle: (backgroundColor === 'rgba(0, 0, 0)' ? "solid" : "none"),
                        borderWidth: (backgroundColor === 'rgba(0, 0, 0)' ? "2px" : "0px")
                    }}
                >
                    {backgroundColor === 'rgba(0, 0, 0)' ?
                        <span style={{backgroundColor: color, borderColor: color}}
                              className={["background-customization-check-active"]}>
                        <CheckOutlinedIcon fontSize="small" sx={{color: "white"}}/>
                    </span>
                        :
                        <span onClick={() => setBackgroundColor('rgba(0, 0, 0)')}
                              className={["background-customization-check-inactive"]}>
                    </span>
                    }
                    <p style={{color: "white", whiteSpace: "nowrap"}}>Lights out</p>
                </Box>
            </Box>
        </>
    );
}

export default BackgroundCustomization;
