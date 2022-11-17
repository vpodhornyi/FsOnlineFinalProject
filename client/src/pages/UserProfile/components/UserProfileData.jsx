import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {StyledTypography, userProfileSecondaryFontColor} from "../../../components/StyledComponents/styledComponents";
import PropTypes from "prop-types";

const UserProfileData = ({username, userTag, joinedDate, followers, followings, bio, location}) => {
    return (
        <>
            <Box sx={{margin: "15px 0 20px 0"}}>
                <Typography sx={{fontSize: "18px"}}><strong>{username}</strong></Typography>
                <Typography sx={{color: userProfileSecondaryFontColor, fontSize: "12px"}}>@{userTag}</Typography>
            </Box>

            <Box>
                {bio ? <Typography>{bio}</Typography> : <></>}

                <div style={{
                    color: userProfileSecondaryFontColor,
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0"
                }}>
                    {location &&
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <LocationOnOutlinedIcon/>
                            <Typography sx={{marginLeft: "5px"}}>{location}</Typography>
                        </Box>
                    }

                    <Box sx={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
                        <CalendarMonthIcon sx={{color: userProfileSecondaryFontColor}}/>
                        <Typography sx={{marginLeft: "5px"}}>Joined: {joinedDate}</Typography>
                    </Box>
                </div>

                <div style={{display: "flex"}}>
                    <StyledTypography><strong style={{color: "black"}}>{followers}</strong> Followers</StyledTypography>
                    <StyledTypography sx={{marginLeft: "10px"}}><strong
                        style={{color: "black"}}>{followings}</strong> Followings</StyledTypography>
                </div>
            </Box>
        </>
    );
};

UserProfileData.propTypes = {
    username: PropTypes.string,
    userTag: PropTypes.string,
    joinedDate: PropTypes.string,
    followers: PropTypes.number,
    followings: PropTypes.number,
    bio: PropTypes.string,
    location: PropTypes.string,
}

export default UserProfileData;