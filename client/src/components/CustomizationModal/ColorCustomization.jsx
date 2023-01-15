import React, {useContext} from "react";
import {useState} from "react";
import "./colorCustomization.css";
import Box from "@mui/material/Box";
import {ThemeContext} from "../../utils/themeContext";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function ColorCustomization() {
    const {color, setColor} = useContext(ThemeContext);
    const [active, setActive] = useState();
    const handleColorChange = (newColor) => {
        setColor(newColor);
    }
    return (
        <>
            <Box
                sx={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "16px",
                    backgroundColor: "rgb(247, 249, 249)",
                    borderRadius: "16px",
                }}
            >

                <a onClick={() => setColor('rgb(29, 155, 240)')}>
                    <span className={["blue-dot", "dot"].join(" ")}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center"
                          }}>
                        {color === 'rgb(29, 155, 240)' &&
                            <CheckOutlinedIcon sx={{color: "white"}}/>
                        }

                    </span>
                </a>
                <a onClick={() => setColor("rgb(255, 212, 0)")}>
                    <span className={["yellow-dot", "dot"].join(" ")}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center"
                          }}>
                          {color === 'rgb(255, 212, 0)' &&
                              <CheckOutlinedIcon sx={{color: "white"}}/>
                          }
                    </span>
                </a>
                <a onClick={() => setColor("rgb(249, 24, 128)")}>
                    <span className={["pink-dot", "dot"].join(" ")}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center"
                          }}>
                          {color === 'rgb(249, 24, 128)' &&
                              <CheckOutlinedIcon sx={{color: "white"}}/>
                          }
                    </span>
                </a>
                <a onClick={() => setColor("rgb(120, 86, 255)")}>
                    <span className={["purple-dot", "dot"].join(" ")}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center"
                          }}>
                          {color === 'rgb(120, 86, 255)' &&
                              <CheckOutlinedIcon sx={{color: "white"}}/>
                          }
                    </span></a>

                <a onClick={() => setColor("rgb(255, 122, 0)")}>
                    <span className={["orange-dot", "dot"].join(" ")}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center"
                          }}>
                          {color === 'rgb(255, 122, 0)' &&
                              <CheckOutlinedIcon sx={{color: "white"}}/>
                          }
                    </span>
                </a>
                <a onClick={() => setColor("rgb(0, 186, 124)")}>
                    <span className={["green-dot", "dot"].join(" ")}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center"
                          }}>
                          {color === 'rgb(0, 186, 124)' &&
                              <CheckOutlinedIcon sx={{color: "white"}}/>
                          }
                    </span>
                </a>


            </Box>
        </>
    );
}
