import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Container from "@mui/material/Container";

const Main = () => {
    return <>
        <Container sx={{display: "flex"}}>
            <Sidebar/>
        </Container>
    </>
}

export default Main;
