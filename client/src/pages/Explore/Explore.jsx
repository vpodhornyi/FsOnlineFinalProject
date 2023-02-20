import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader, Tweet} from "../../components";
import ExploreHeader from "./Header";
import {useDispatch, useSelector} from "react-redux";
import Tweets from "../Home/Tweets";
import {Box} from "@mui/material";

const Explore = () => {
    return (
        <ColumnWrapper>

            <PrimaryColumn>
                <PrimaryHeader pageElement={<ExploreHeader/>}/>
                <Box sx={{margin: "20px 0 0 0"}}>
                    <Tweets bookmarksValue={false}/>
                </Box>
            </PrimaryColumn>

            <SitebarColumn>
                <StickyHeader>
                </StickyHeader>
                    Who to follow
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Explore;
