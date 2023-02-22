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
import {clearUserRecommends, getUserRecommends} from "../../redux/user/action";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import CircularLoader from "../../components/loaders/CircularLoader";

const Explore = () => {
    const dispatch = useDispatch();
    const user = useSelector(getPersonalData);
    const loading = useSelector(getUserLoadingState);
    const isPageable = useSelector(getIsPageableState);
    const recommends = useSelector(getUserRecommendsState);

    useEffect(() => {
        dispatch(clearUserRecommends());
    }, []);

    const onShowMoreButtonClick = async () => {
        dispatch(getUserRecommends(user?.id, true));
    };

    console.log(recommends.data.length % 3 > 0)

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
                    <StyledBox>
                        <Box>
                            <Typography sx={{fontSize: "18px", fontWeight: "bold"}}>Who to follow</Typography>
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
                        <Button
                            disabled={!isPageable}
                            onClick={onShowMoreButtonClick}>{!isPageable ? "Sorry. It is all recommends for you." : "Show more"}
                        </Button>
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
