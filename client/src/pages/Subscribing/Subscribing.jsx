import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import {a11yProps} from "../UserProfile/UserProfile";
import TabPanel from "../UserProfile/components/TabPanel";
import {useParams} from "react-router-dom";

const Subscribing = () => {
    const {username} = useParams();
    const [tabVal, setTabVal] = useState(0);
    const handleTabVal = (e, newVal) => setTabVal(newVal);



    return (
        <Box sx={{width: "100%", marginTop: "25px"}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                    value={tabVal}
                    onChange={handleTabVal}
                    indicatorColor={"primary"}
                    textColor={"primary"}
                >
                    <Tab sx={{justifySelf: "center"}} label="Followers" {...a11yProps(0)}></Tab>
                    <Tab sx={{justifySelf: "center"}} label="Followings" {...a11yProps(1)}></Tab>
                </Tabs>
            </Box>

            <TabPanel value={tabVal} index={0}>
                Followers
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
                Followings
            </TabPanel>
        </Box>
    );
};

export default Subscribing;