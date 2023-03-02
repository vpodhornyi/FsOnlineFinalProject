import React from "react";
import {
    ColumnWrapper,
    PrimaryColumn,
    PrimaryHeader,
    SitebarColumn,
    StickyHeader,
} from "../../components";
import Tweets from "../Home/Tweets";
import {useSelector} from "react-redux";
import {URLS} from "../../services/API";
import {Searchbar} from "../../components/Searchbar";
import {getPersonalData} from "../../redux/user/selector";
import PageHeader from "../../components/PageHeader/PageHeader";

const Bookmarks = () => {
    const authUser = useSelector(getPersonalData);

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader subtitle={`@${authUser?.userTag}`} page={"Bookmarks"}/>}
                               isBack={false}/>
                <Tweets stateValue={{name: "bookmarks", url: URLS.TWEET.BOOKMARKS}}/>
            </PrimaryColumn>
            <SitebarColumn>
                <StickyHeader>
                    <Searchbar/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Bookmarks;
