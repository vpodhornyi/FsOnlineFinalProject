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
import {getTweets} from "../../redux/tweet/action";
import {URLS} from "../../services/API";
import {getTweetState, loadingTweetsState} from "../../redux/tweet/selector";

const Explore = () => {
    const dispatch = useDispatch();
    const user = useSelector(getPersonalData);
    const loading = useSelector(getUserLoadingState);
    const isPageable = useSelector(getIsPageableState);
    const recommends = useSelector(getUserRecommendsState);
    const isAuth = useSelector(getAuthorized);

    useEffect(() => {
        dispatch(getAuthUser());
        dispatch(clearUserRecommends());
        dispatch(getUserRecommends(user?.id, false))
    }, []);

    const onShowMoreButtonClick = async () => {
        dispatch(getUserRecommends(user?.id, true));
    };

    return (
        <ColumnWrapper>

            <PrimaryColumn>
                <PrimaryHeader pageElement={<ExploreHeader/>}/>
                <Box sx={{margin: "20px 0 0 0"}}>
                    <Tweets exploreValue={true} bookmarksValue={false}/>
                </Box>
            </PrimaryColumn>

            <SitebarColumn>
                <StickyHeader>
                    <StyledBox>
                        {isAuth ?
                            <>
                                <Box>
                                    <Typography sx={{fontSize: "18px", fontWeight: "bold"}}>Who to follow</Typography>
                                    {recommends?.data.length > 0 &&
                                        <Typography fontSize={"small"}>Recommendations for you</Typography>}
                                </Box>
                                <Box>
                                    {loading ? <CircularLoader/> : recommends?.data.map(u =>
                                        <ProfilePreview
                                            key={u.id}
                                            userTag={u.userTag}
                                            username={u.name}
                                            id={u.id}
                                            avatar={u.avatarImgUrl}
                                            descr={u.bio}
                                            followers={u.followers}
                                            isBio={false}
                                        />
                                    )}
                                </Box>
                                {recommends?.data.length > 0 ?
                                    <Button
                                        disabled={!isPageable}
                                        onClick={onShowMoreButtonClick}>{!isPageable ? "Sorry. It is all recommends for you." : "Show more"}
                                    </Button> :
                                    <Typography fontSize={"small"}>Sorry. There are not recommendations for you.
                                        Comeback
                                        soon.
                                    </Typography>
                                }
                            </> :
                            <>
                                <Typography sx={{fontSize: "18px", fontWeight: "bold"}}>New to twitter?</Typography>
                                <Typography fontSize={"small"}>Sign up now to get your own personalized
                                    feed!</Typography>
                            </>
                        }
                    </StyledBox>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

const StyledBox = styled(props => (<Box {...props}/>))(() => ({
    "&": {
        padding: "10px",
        margin: "20px 0 0 0",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#eee",
        border: "0 solid black",
        borderRadius: "2%",
        transition: "0.5s"
    }
}));

export default Explore;
