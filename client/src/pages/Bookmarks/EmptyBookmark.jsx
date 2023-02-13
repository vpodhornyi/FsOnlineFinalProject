import React from 'react';
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const EmptyBookmark = () => {
    return <BoxWrapper>
        <Box
            component="img"
            sx={{
                height: 233,
                width: 350,
                // maxHeight: {xs: 233, md: 167},
                // maxWidth: {xs: 350, md: 250},
            }}
            alt="Book in bird cage"
            src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png"
        />
        <Typography variant={"h2"} sx={{textAlign: "center", fontWeight: "bold", fontSize: "36px"}}>Save Tweets for
            later</Typography>
        <Typography sx={{textAlign: "center", fontSize: "16px"}}>Don’t let the good ones fly away! Bookmark Tweets to
            easily find them again in the future.</Typography>
    </BoxWrapper>
}
const BoxWrapper = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "40px"
}));
export default EmptyBookmark