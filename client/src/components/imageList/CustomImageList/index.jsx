import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {openModal} from "../../../redux/modal/action";
import {useDispatch} from "react-redux";

function CustomImageList({itemData}) {
const dispatch= useDispatch();
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
                        }} onClick={()=>{
                            dispatch(openModal({ id: null, typeModal: "FULL_IMG",activeUrl:url}))}} src={url} key={i} alt={url}/>
                    );
                })}
        </Box>

    );
}

CustomImageList.propTypes = {
    itemData: PropTypes.array,
};
export default CustomImageList;
