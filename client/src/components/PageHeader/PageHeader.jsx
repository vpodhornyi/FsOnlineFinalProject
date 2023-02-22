import React from 'react';
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

const PageHeader = ({page, subtitle}) => {
    return (
        <BoxWrapper>
            <Typography className='HeaderTitle' variant='h2'>{page}</Typography>
            <Typography variant='body2'>{subtitle}</Typography>
        </BoxWrapper>
    );
};

const BoxWrapper = styled(Box)(({}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

PageHeader.propTypes = {
    page: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
}

export default PageHeader;