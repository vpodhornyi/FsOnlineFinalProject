import React, { lazy, Suspense } from "react";

import {
  ColumnWrapper,
  PrimaryColumn,
  SitebarColumn,
  StickyHeader,
  TweetForm,
} from "../../components";
import { Outlet } from "react-router-dom";
import {Searchbar} from "../../components/Searchbar";

const Tweets = lazy(() => import("./Tweets"));

const Home = () => {
  return (
      <ColumnWrapper>
        <PrimaryColumn>
            <Outlet />
        </PrimaryColumn>
        <SitebarColumn>
          <StickyHeader>
            <Searchbar/>
          </StickyHeader>
        </SitebarColumn>
      </ColumnWrapper>
  );
};

export default Home;
