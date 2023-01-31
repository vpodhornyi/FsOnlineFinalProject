import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import {StyledTypography, userProfileSecondaryFontColor} from "../../../components/StyledComponents/styledComponents";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {PATH} from "../../../utils/constants";

const UserProfileData = ({username, userTag, joinedDate, followers, followings, bio, location, birthDate}) => {
    return (
        <>
            <Box sx={{margin: "15px 0 15px 0"}}>
                <Typography sx={{fontSize: "18px"}}><strong>{username}</strong></Typography>
                <Typography sx={{color: userProfileSecondaryFontColor, fontSize: "12px"}}>@{userTag}</Typography>
            </Box>

            <Box>
                {bio ? <Typography sx={{fontSize: "18px"}}>{bio}</Typography> : <></>}

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

                    <Box sx={{display: "flex", alignItems: "center"}}>
                        {birthDate && <>
                            <CakeOutlinedIcon sx={{color: userProfileSecondaryFontColor}}/>
                            <Typography sx={{margin: "0 5px"}}>Born: {birthDate.replaceAll("-", ".")}</Typography>
                        </>}
                        <CalendarMonthIcon sx={{color: userProfileSecondaryFontColor, marginRight: "5px"}}/>
                        <Typography>Joined: {joinedDate}</Typography>
                    </Box>
                </div>

                <div style={{display: "flex"}}>
                    <StyledTypography>
                        <Link style={{color: userProfileSecondaryFontColor, textDecoration: "none"}} to={`${PATH.USER_PAGE.followers(userTag)}`}><span style={{color: "black", fontWeight: 600}}>{followers}</span> Followers</Link>
                    </StyledTypography>
                    <StyledTypography sx={{marginLeft: "10px"}}>
                        <Link style={{color: userProfileSecondaryFontColor, textDecoration: "none"}} to={`${PATH.USER_PAGE.followings(userTag)}`}><span style={{color: "black", fontWeight: 600}}>{followings}</span> Followings</Link>
                    </StyledTypography>
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
    birthDate: PropTypes.string,
}

export default UserProfileData;