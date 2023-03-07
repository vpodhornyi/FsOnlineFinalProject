import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import {StyledTypography} from "../pages/styledComponents";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/constants";
import {styled} from "@mui/system";
import {useSelector} from "react-redux";
import {getCustomizationTheme} from "../../../redux/user/selector";
import {BACKGROUND} from "../../../utils/theme";

const UserProfileData = ({username, userTag, followers, followings, bio, location, birthDate}) => {
    const navigate = useNavigate();
    const {backgroundColor} = useSelector(getCustomizationTheme);

    return (
        <>
            <Box sx={{margin: "15px 0 15px 0"}}>
                <UserName variant='h2'>{username}</UserName>
                <Typography variant='body2'>@{userTag}</Typography>
            </Box>

            <Box>
                {bio && <Typography>{bio}</Typography>}

                <Box style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0"
                }}>
                    {location &&
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <LocationIcon/>
                            <Typography variant='body2' sx={{margin: "0 5px"}}>{location}</Typography>
                        </Box>
                    }

                    <Box sx={{display: "flex", alignItems: "center"}}>
                        {birthDate && <>
                            <BirthIcon/>
                            <Typography variant='body2'
                                        sx={{margin: "0 5px"}}>Born: {birthDate.replaceAll("-", ".")}</Typography>
                        </>}
                    </Box>
                </Box>

                <Box style={{display: "flex"}}>
                    <SubsLink
                        onClick={() => navigate(PATH.USER_PAGE.followers(userTag))}
                    >
                        {followers} Followers
                    </SubsLink>

                    <SubsLink
                        sx={{marginLeft: "10px"}}
                        onClick={() => navigate(PATH.USER_PAGE.followings(userTag))}
                    >
                        {followings} Followings
                    </SubsLink>
                </Box>
            </Box>
        </>
    );
};

const UserName = styled(props => (<Typography {...props}/>))(({theme}) => ({
    "&": {
        fontSize: '1.3rem',
        fontWeight: theme.typography.fontWeightBold
    }
}))

const SubsLink = styled(props => (<Typography {...props}/>))(({theme}) => ({
    "&": {
        color: theme.palette.textColor,
        display: "flex",
        alignItems: "center"
    },
    "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
    }
}));

const LocationIcon = styled(props => (<LocationOnOutlinedIcon {...props}/>))(({theme}) => ({
    "&": {
        color: theme.palette.text.third
    }
}));

const BirthIcon = styled(props => (<CakeOutlinedIcon {...props}/>))(({theme}) => ({
    "&": {
        color: theme.palette.text.third
    }
}));

UserProfileData.propTypes = {
    username: PropTypes.string,
    userTag: PropTypes.string,
    followers: PropTypes.number,
    followings: PropTypes.number,
    bio: PropTypes.string,
    location: PropTypes.string,
    birthDate: PropTypes.string,
}

export default UserProfileData;