import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import {useSelector} from "react-redux";
import {getCustomizationTheme, getPersonalData} from "../../redux/user/selector";
import {Searchbar} from "../../components/Searchbar";
import PageHeader from "../../components/PageHeader/PageHeader";
import Recommendations from "../../components/Recommendations/Recommendations";
import {Box, Typography} from "@mui/material";
import {TypographyBold} from "../UserProfile/pages/styledComponents";
import {styled} from "@mui/system";
import {BACKGROUND} from "../../utils/theme";

const Lists = () => {
    const authUser = useSelector(getPersonalData);
    const {backgroundColor} = useSelector(getCustomizationTheme);

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader subtitle={`@${authUser?.userTag}`} page={"Lists"}/>} isBack={true}/>

                <ListBox sx={{borderBottom: `1px solid ${BACKGROUND[backgroundColor]?.palette.border.main}`}}>
                    <TypographyBold variant="h2">Pinned Lists</TypographyBold>
                    <Typography sx={{padding: "20px 15px 15px 15px"}} variant="body2">Nothing to see here yet — pin your favorite Lists to access them quickly.</Typography>
                </ListBox>

                <ListBox>
                    <TypographyBold variant="h2">Your Lists</TypographyBold>
                    <Typography sx={{padding: "20px 15px 15px 15px"}} variant="body2">You haven`t created or followed any Lists. When you do, they`ll show up here.</Typography>
                </ListBox>
            </PrimaryColumn>

            <SitebarColumn>
                <StickyHeader>
                    <Searchbar/>
                    <Recommendations/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

const ListBox = styled(Box)(({theme}) => ({
    "&": {
        display: "flex",
        flexDirection: "column",
        padding: "15px 0 0 10px"
    }
}));

export default Lists;
