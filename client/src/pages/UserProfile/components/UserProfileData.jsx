import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import {StyledTypography} from "../../../components/StyledComponents/styledComponents";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/constants";
import {styled} from "@mui/system";

const UserProfileData = ({username, userTag, followers, followings, bio, location, birthDate}) => {
    const navigate = useNavigate();

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
                    <StyledTypography>
                        <SubTypography variant='body2'>{followers}
                            <Typography
                                sx={{marginLeft: "5px"}}
                                variant='body2'
                                onClick={() => navigate(PATH.USER_PAGE.followers(userTag))}
                            >
                                Followers
                            </Typography>
                        </SubTypography>
                    </StyledTypography>

                    <StyledTypography sx={{marginLeft: "10px"}}>
                        <SubTypography variant='body2'>{followings}
                            <Typography
                                sx={{marginLeft: "5px"}}
                                variant='body2'
                                onClick={() => navigate(PATH.USER_PAGE.followings(userTag))}
                            >
                                Followings
                            </Typography>
                        </SubTypography>
                    </StyledTypography>
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

const SubTypography = styled(props => (<Typography {...props}/>))(({theme}) => ({
    "&": {
        color: theme.palette.textColor,
        display: "flex",
        alignItems: "center"
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