import React from "react";

import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from '../../components';

const Home = () => {

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Home primary column
        </StickyHeader>
        BODY Home primary column
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
