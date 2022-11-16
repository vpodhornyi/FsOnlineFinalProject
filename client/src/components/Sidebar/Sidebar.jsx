import React, {useState} from "react";
import "./css/sidebarc.css"
import {useSelector} from 'react-redux';
import SidebarMenu from "./components/SidebarMenu";
import {Container} from "@mui/material";
import Popover from '@mui/material/Popover';
import SidebarFooter from "./components/SidebarFooter";
import {getMainMenuState} from "../../redux/business/menu/mainMenu/selector";
import SidebarMedia from "./SidebarMedia";
import useMediaQuery from "@mui/material/useMediaQuery";

const Sidebar = () => {
    const matches = useMediaQuery('(max-width:450px)');

    const {
        themeColor,
    } = useSelector(getMainMenuState);

    return (
        <>
            {
                matches ?
                    <SidebarMedia/> :
                    <div className={"sidebar-wrapper"}>
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
