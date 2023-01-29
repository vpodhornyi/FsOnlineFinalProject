import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";

const Header = ({user, page}) => {
    const location = useLocation();
    const tweets = user?.tweets.length === 1 ? `${user?.tweets.length} Tweet` : `${user?.tweets.length} Tweets`

    return (
        <BoxWrapper>
            <Typography className='HeaderTitle' variant='h2'>{page}</Typography>
            <Typography variant='body2'>{
                location.pathname.replaceAll("/", "") !== user?.userTag
                    ? `@${user?.userTag}`
                    : tweets
            }</Typography>
        </BoxWrapper>
    );
}

const BoxWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

Header.propTypes = {
    user: PropTypes.object,
    page: PropTypes.string
}
export default Header;
