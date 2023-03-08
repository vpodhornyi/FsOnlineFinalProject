import React, {useEffect} from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import ExploreHeader from "./Header";
import {useDispatch, useSelector} from "react-redux";
import Tweets from "../Home/Tweets";
import {Box, Button, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {
    getIsPageableState,
    getPersonalData,
    getUserLoadingState,
    getUserRecommendsState
} from "../../redux/user/selector";
import {clearUserRecommends, getAuthUser, getUserRecommends} from "../../redux/user/action";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import CircularLoader from "../../components/loaders/CircularLoader";
import {getAuthorized} from "../../redux/auth/selector";
import {URLS} from "../../services/API";
import Recommendations from "../../components/Recommendations/Recommendations";

const Explore = () => {
    const isAuth = useSelector(getAuthorized);

    return (
        <ColumnWrapper>

            <PrimaryColumn>
                <PrimaryHeader pageElement={<ExploreHeader/>}/>
                <Box sx={{margin: "20px 0 50px 0"}}>
                    <Tweets stateValue={{name: "tweets", url: isAuth ? URLS.TWEET.ALL : URLS.TWEET.EXPLORE}}/>
                </Box>
            </PrimaryColumn>

            <SitebarColumn>
                <StickyHeader>
                    <Recommendations/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Explore;
