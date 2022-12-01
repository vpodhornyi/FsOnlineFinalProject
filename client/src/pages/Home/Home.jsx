import React, {lazy, Suspense} from "react";

import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, TweetForm} from '../../components';
import Loading from "../../components/Loader/Loading";

const Home = () => {
  const Tweets = lazy(() => import('./Tweets'));
  console.log('kuku');
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Home primary column
        </StickyHeader>
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
