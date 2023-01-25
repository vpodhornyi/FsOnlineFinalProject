import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import ExploreHeader from "./Header";

const Explore = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={ExploreHeader}/>
        BODY Explore primary column
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER Explore sitebar column
        </StickyHeader>
        BODY Explore sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Explore;
