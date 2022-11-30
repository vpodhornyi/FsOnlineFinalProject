import React from "react";

import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, TweetForm} from '../../components';

const Home = () => {

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Home primary column
        </StickyHeader>
        <TweetForm/>

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
