import React from "react";
import {
    ColumnWrapper,
    PrimaryColumn,
    SitebarColumn,
    StickyHeader,
    PrimaryHeader,
} from "../../components";
import Tweets from "../Home/Tweets";
import {getBookmarksState} from "../../redux/tweet/selector";
import {useSelector} from "react-redux";
import EmptyBookmark from "./EmptyBookmark";
import {Searchbar} from "../../components/Searchbar";
import {getPersonalData} from "../../redux/user/selector";
import PageHeader from "../../components/PageHeader/PageHeader";

const Bookmarks = () => {
    const authUser = useSelector(getPersonalData);
    const bookmarks = useSelector(getBookmarksState)

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader subtitle={`@${authUser?.userTag}`} page={"Bookmarks"}/>} isBack={false}/>
                <Tweets bookmarksValue={true}/>
                {!bookmarks.data.length && <EmptyBookmark/>}
            </PrimaryColumn>
            <SitebarColumn>
                <StickyHeader><Searchbar/></StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Bookmarks;
