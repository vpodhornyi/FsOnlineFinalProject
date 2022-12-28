import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";

const Lists = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Lists primary column
        </StickyHeader>
        BODY Lists primary column
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER Lists sitebar column
        </StickyHeader>
        BODY Lists sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Lists;
