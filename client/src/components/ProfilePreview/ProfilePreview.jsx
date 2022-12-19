import React from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Typography} from "@mui/material";
import {StyledDarkButton, StyledLightButton, StyledTypography} from "../StyledComponents/styledComponents";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../redux/auth/selector";

const ProfilePreview = ({id, avatar, username, userTag, descr}) => {
    const authUser =  useSelector(getPersonalData);

    const handleOnMouseEnter = (e) => e.target.innerText = "Unfollow";
    const handleOnMouseLeave = (e) => e.target.innerText = "Following";

    return (
        <Box sx={{
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.3)"
            },
            display: "flex",
            padding: "10px"
        }}>
            <Avatar src={avatar}>{username[0].toUpperCase()}</Avatar>

            <div>
                <Typography>{username}</Typography>
                <StyledTypography>@{userTag}</StyledTypography>
            </div>

            {
                authUser?.followings.includes(id) ?
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
                    >
                        Following
                    </StyledLightButton> :
                    <StyledDarkButton>
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