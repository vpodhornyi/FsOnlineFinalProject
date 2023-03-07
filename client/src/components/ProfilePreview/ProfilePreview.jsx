import React from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Typography} from "@mui/material";
import {
    ThemeButtonDark,
    StyledTypography,
    ThemeButtonLight
} from "../../pages/UserProfile/pages/styledComponents";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../redux/user/selector";
import {Link} from "react-router-dom";
import {followUser, unfollowUser} from "../../services/followService";
import {getAuthUser} from "../../redux/user/action";
import {styled} from "@mui/system";

const ProfilePreview = (props) => {
    const {id, avatar, username, userTag, descr, isBio} = props;

    const authUser = useSelector(getPersonalData);
    const dispatch = useDispatch();
    const handleOnMouseEnter = (e) => e.target.innerText = "Unfollow";
    const handleOnMouseLeave = (e) => e.target.innerText = "Following";

    return (
            <BoxWrapper>
                <Link style={{textDecoration: "none"}} to={`/${userTag}`}>

                <div style={{display: "flex"}}>
                    <Avatar src={avatar || ""}>{username[0].toUpperCase()}</Avatar>
                    <div style={{marginLeft: "10%"}}>
                        <Typography sx={{textDecoration: "none"}}>
                            {username}
                            {authUser?.userTag === userTag ?
                                <span style={{fontWeight: 'bold', marginLeft: "5px"}}>
                                    (Me)
                                </span>
                                : ""
                            }
                        </Typography>
                        <StyledTypography>@{userTag}</StyledTypography>
                        { isBio && <StyledTypography>{descr}</StyledTypography>}
                    </div>
                </div>
                </Link>


                {
                    <Box style={{display: authUser?.userTag === userTag ? "none" : "block"}}>
                        {authUser?.followings.includes(userTag) ?
                            <ThemeButtonLight
                                variant="contained"
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                                onClick={async () => {
                                    unfollowUser(authUser?.id, id);
                                    dispatch(getAuthUser());
                                }}
                            >
                                Following
                            </ThemeButtonLight> :
                            <ThemeButtonDark
                                onClick={async () => {
                                    followUser(authUser?.id, id);
                                    dispatch(getAuthUser());
                                }}
                            >
                                Follow
                            </ThemeButtonDark>
                        }
                    </Box>
                }
            </BoxWrapper>
    );
};

const BoxWrapper = styled(Box)(({theme}) => ({
    "&:hover": {
        cursor: "pointer",
        transition: "0.5s",
        backgroundColor: theme.palette.input.background
    },
    display: "flex",
    padding: "10px",
    justifyContent: "space-between"
}));

ProfilePreview.propTypes = {
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string,
    userTag: PropTypes.string,
    descr: PropTypes.string,
    isBio: PropTypes.bool,
}

export default ProfilePreview;