import React, {useState} from "react";
import {useSelector} from 'react-redux';
import SidebarMenu from "./components/SidebarMenu";
import {Container} from "@mui/material";
import SidebarFooter from "./components/SidebarFooter";
import {sidebarMenu} from "./data/sidebarMenu"
import SidebarMedia from "./SidebarMedia";
import useMediaQuery from "@mui/material/useMediaQuery";

const Sidebar = () => {
    const matches = useMediaQuery('(max-width:450px)');
    const {themeColor} = sidebarMenu;

    return (
        <>
            {
                matches ?
                    <SidebarMedia/> :
                    <div style={{
                        maxWidth: "25%",
                        boxSizing: "border-box"
                    }}>
                        <Container sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            height: "100vh",
                        }}>
                            <SidebarMenu/>
                            <SidebarFooter theme={themeColor}/>
                        </Container>
                    </div>
            }
        </>
    );
};

export default Sidebar;
