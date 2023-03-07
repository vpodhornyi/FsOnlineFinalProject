import React, {lazy} from "react";

import {
    ColumnWrapper,
    PrimaryColumn,
    SitebarColumn,
    StickyHeader,
} from "../../components";
import {Outlet} from "react-router-dom";
import {Searchbar} from "../../components/Searchbar";
import Recommendations from "../../components/Recommendations/Recommendations";

const Tweets = lazy(() => import("./Tweets"));

const Home = () => {
    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <Outlet/>
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

export default Home;
