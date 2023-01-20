import React, {lazy, Suspense} from "react";

import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader, TweetForm} from '../../components';
import Loading from "../../components/Loader/Loading";
import HomeHeader from "./Header";

const Tweets = lazy(() => import('./Tweets'));

const Home = () => {

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={HomeHeader}/>
        <TweetForm/>
        <Suspense fallback={<Loading/>}>
          <Tweets/>
        </Suspense>
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>
          HEADER Home sitebar column
        </StickyHeader>
        BODY Home sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Home;
