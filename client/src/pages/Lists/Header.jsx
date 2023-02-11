import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../redux/user/selector";

const Header = ({user, page}) => {
    const authUser = useSelector(getPersonalData);

    return (
        <BoxWrapper>
            <Typography className='HeaderTitle' variant='h2'>{page}</Typography>
            <Typography variant='body2'>{user || authUser?.userTag}</Typography>
        </BoxWrapper>
    );
}

const BoxWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

Header.propTypes = {
    user: PropTypes.string,
    page: PropTypes.string
}
export default Header;
