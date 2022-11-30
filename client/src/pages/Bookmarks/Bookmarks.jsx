import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";

const Bookmarks = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Bookmarks primary column
        </StickyHeader>
        BODY Bookmarks primary column
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER Bookmarks sitebar column
        </StickyHeader>
        BODY Bookmarks sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Bookmarks;
