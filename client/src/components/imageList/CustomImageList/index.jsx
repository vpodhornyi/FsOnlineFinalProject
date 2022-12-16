import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/constants";

function CustomImageList({itemData}) {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                gap: "5px",
                flex:1,
                flexDirection:"column",
                flexWrap: "wrap"
            }}
        >
            {itemData&&
                itemData.map((el, i) => {
                    const url = el?.imgUrl?el.imgUrl:el;
                    return (
                        <img style={{
                            flex: 1,
                            backgroundSize: "cover",
                            maxWidth:"100%",
                            borderRadius: "25px",
                        }} onClick={()=> navigate(PATH.TWEET.IMG, {state: {background: location,url}})
                           } src={url} key={i} alt={url}/>
                    );
                })}
        </Box>

    );
}

CustomImageList.propTypes = {
    itemData: PropTypes.array,
};
export default CustomImageList;
