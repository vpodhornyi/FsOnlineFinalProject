import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/constants";
import {styled} from "@mui/system";
import {useSelector} from "react-redux";
import {getAuthorized} from "../../../redux/auth/selector";

const UserProfileData = ({username, userTag, followers, followings, bio, location, birthDate}) => {
    const navigate = useNavigate();
    const locale = useLocation();
    const isAuth = useSelector(getAuthorized);

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
                        onClick={() => isAuth ? navigate(PATH.USER_PAGE.followers(userTag)) : navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {state: {background: locale}})}
                    >
                        {followers} Followers
                    </SubsLink>

                    <SubsLink
                        sx={{marginLeft: "10px"}}
                        onClick={() => isAuth ? navigate(PATH.USER_PAGE.followings(userTag)) : navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {state: {background: locale}})}
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