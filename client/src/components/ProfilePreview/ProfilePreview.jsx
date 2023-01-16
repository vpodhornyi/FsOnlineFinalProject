import React from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Typography} from "@mui/material";
import {StyledDarkButton, StyledLightButton, StyledTypography} from "../StyledComponents/styledComponents";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../redux/auth/selector";
import {Link} from "react-router-dom";
import {followUser, unfollowUser} from "../../services/followService";

const ProfilePreview = (props) => {
    const {id, avatar, username, userTag, descr} = props;
    const authUser = useSelector(getPersonalData);
    const handleOnMouseEnter = (e) => e.target.innerText = "Unfollow";
    const handleOnMouseLeave = (e) => e.target.innerText = "Following";

    return (
            <Box
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                        transition: "0.5s",
                        backgroundColor: "#f0f0f0"
                    },
                    display: "flex",
                    padding: "10px",
                    justifyContent: "space-between",
                }}>
                <Link style={{textDecoration: "none"}} to={`/${userTag}`}>

                <div style={{display: "flex"}}>
                    <Avatar src={avatar || ""}>{username[0].toUpperCase()}</Avatar>
                    <div style={{marginLeft: "10%"}}>
                        <Typography>{username}</Typography>
                        <StyledTypography>@{userTag}</StyledTypography>
                        <StyledTypography>{descr}</StyledTypography>
                    </div>
                </div>
                </Link>


                {
                    authUser?.followings.includes(userTag) ?
                        <StyledLightButton
                            sx={{
                                "&:hover": {
                                    borderColor: "rgb(253, 201, 206)",
                                    color: "rgb(244, 33, 46)",
                                    backgroundColor: "rgba(244, 33, 46, 0.1)",
                                    transition: "0.5s",
                                }
                            }}
                            variant="contained"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={() => {unfollowUser(authUser?.id, id);}}
                        >
                            Following
                        </StyledLightButton> :
                        <StyledDarkButton
                            onClick={() => followUser(authUser?.id, id)}
                        >
                            Follow
                        </StyledDarkButton>
                }
            </Box>
    );
};

ProfilePreview.propTypes = {
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string,
    userTag: PropTypes.string,
    descr: PropTypes.string,
}

export default ProfilePreview;