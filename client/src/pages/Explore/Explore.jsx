import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";

const Explore = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Explore primary column
        </StickyHeader>
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
