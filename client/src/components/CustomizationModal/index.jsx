import React, {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {TweetForm} from "../tweetComponents/TweetForm/index";
import ColorCustomization from "./ColorCustomization";
import BackgroundCustomization from "./BackgroundCustomization";
import Slider from "@mui/material/Slider";
import CustomButton from "@components/CustomButton";
import Tweet from "../tweetComponents/Tweet";
import UseButton from "../CustomButton";
import {ThemeContext} from "../../utils/themeContext"

const buttonStyle = {
    color: "white",
    backgroundColor: "rgb(29, 155, 240)",
    marginTop: "25px",
    marginBottom: "25px"
};

const tweetInfo = {
    id: "999999",
    body: "At the heart of Twitter are short messages called Tweets — just like this one — which can include photos, videos, links, text, hashtags, and mentions like @Twitter",
    images: [],
    actions: [],
    user: {
        name: "Twitter",
        avatarImgUrl: "data:image/png;base64,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",
        userTag: "@Twitter",
        created_at: ""
    }
}
export default function CustomizationModal() {
    const {color, backgroundColor} = useContext(ThemeContext);
    const fontSizeHandler = (event, newValue) => {
        document.getElementsByTagName("html")[0].style.fontSize = newValue + "px";

    };


    return (
        <>
            <Box
                sx={{
                    width: ["440px", "!important"],
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    overflow: "hidden",
                    maxHeight: "90vw",
                    backgroundColor: backgroundColor,
                    borderRadius: "8px"

                }}
            >
                <Box
                    sx={{
                        fontSize: "1.533rem",
                        fontWeight: 800,
                        textAlign: "center",
                        marginTop: "32px",
                        marginBottom: "12px",
                        lineHeight: "28px",
                    }}
                >
                    Customize your view
                </Box>

                <Box
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        textAlign: "center",
                        lineHeight: "20px",
                        color: "rgb(83, 100, 113)",
                        marginBottom: "15px"
                    }}
                >
                    These settings affect all the Twitter accounts on this browser.
                </Box>
                <div style={{pointerEvents: "none"}}>
                    <Tweet tweetInfo={tweetInfo}/>
                </div>

                <Box
                    sx={{
                        fontSize: "0.867rem",
                        color: "rgb(83, 100, 113)",
                        fontWeight: 700,
                        lineHeight: "20px",
                    }}
                >
                    Font size
                </Box>
                <Slider sx={{color: color}} step={1} marks min={14} max={18} onChange={fontSizeHandler}/>
                <Box
                    sx={{
                        fontSize: "0.867rem",
                        color: "rgb(83, 100, 113)",
                        fontWeight: 700,
                        lineHeight: "20px",
                        marginBottom: "3px",
                        marginTop: "8px"
                    }}
                >
                    Color
                </Box>
                <ColorCustomization/>
                <Box
                    sx={{
                        fontSize: "0.867rem",
                        color: "rgb(83, 100, 113)",
                        fontWeight: 700,
                        lineHeight: "20px",
                        marginTop: "8px"
                    }}
                >
                    Background
                </Box>
                <BackgroundCustomization/>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "15px",
                        marginBottom: "15px"
                    }}
                >
                    <UseButton name="Done" customStyle={"buttonStyle"} onclickAction={function () {
                    }}/>
                </Box>
            </Box>
        </>
    );
}
