import React, {lazy, Suspense} from "react";

import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader, TweetForm} from '../../components';
import Loading from "../../components/Loader/Loading";
import HomeHeader from "./Header";
import {Searchbar} from "../../components/Searchbar";

const Tweets = lazy(() => import('./Tweets'));

const Home = () => {

  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={<HomeHeader/>}/>
          <TweetForm/>
          <Suspense fallback={<Loading/>}>
            <Tweets/>
          </Suspense>
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
