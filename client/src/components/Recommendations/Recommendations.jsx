import React, {useEffect} from 'react';
import {styled} from "@mui/system";
import {Box, Button, Typography} from "@mui/material";
import CircularLoader from "../loaders/CircularLoader";
import ProfilePreview from "../ProfilePreview/ProfilePreview";
import {useDispatch, useSelector} from "react-redux";
import {
    getIsPageableState,
    getPersonalData,
    getUserLoadingState,
    getUserRecommendsState
} from "../../redux/user/selector";
import {getAuthorized} from "../../redux/auth/selector";
import {clearUserRecommends, getAuthUser, getUserRecommends} from "../../redux/user/action";
import {ThemeButtonLightNoHover, TypographyBold} from "../../pages/UserProfile/pages/styledComponents";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../utils/constants";

const Recommendations = () => {
    const dispatch = useDispatch();
    const user = useSelector(getPersonalData);
    const loading = useSelector(getUserLoadingState);
    const isPageable = useSelector(getIsPageableState);
    const recommends = useSelector(getUserRecommendsState);
    const isAuth = useSelector(getAuthorized);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (isAuth && user.id) {
            dispatch(getAuthUser());
            dispatch(clearUserRecommends());
            dispatch(getUserRecommends(user?.id, false));
        }
    }, [user.id]);

    const onShowMoreButtonClick = async () => {
        dispatch(getUserRecommends(user?.id, true));
    };

    return (
        <StyledBox>
            {isAuth ?
                <>
                    <Box>
                        <TypographyBold variant={"h2"}>Who to follow</TypographyBold>
                        {recommends?.data.length > 0 &&
                            <Typography variant={"body2"}>Recommendations for you</Typography>}
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
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography sx={{fontSize: "18px", fontWeight: "bold"}}>New to twitter?</Typography>
                    <Typography fontSize={"small"}>Sign up now to get your own personalized feed!</Typography>
                    <ThemeButtonLightNoHover
                        onClick={() => navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_UP.ROOT}`, {state: {background: location}})}
                        sx={{width: "100%", margin: "10px 0"}}
                    >
                        Sign up
                    </ThemeButtonLightNoHover>
                    <ThemeButtonLightNoHover
                        onClick={() => navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {state: {background: location}})}
                        sx={{width: "100%", margin: "10px 0"}}
                    >
                        Log in
                    </ThemeButtonLightNoHover>

                </Box>
            }
        </StyledBox>
    );
};

const StyledBox = styled(props => (<Box {...props}/>))(({theme}) => ({
    "&": {
        position: "relative",
        zIndex: 1,
        padding: "10px",
        margin: "20px 0 0 0",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: theme.palette.border.main,
        border: "0 solid black",
        borderRadius: "2%",
        transition: "0.5s",
    }
}));

export default Recommendations;