import React from "react";
import {
  ColumnWrapper,
  PrimaryColumn,
  SitebarColumn,
  StickyHeader,
} from "../../components";
import Tweets from "../Home/Tweets";

const Bookmarks = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>HEADER Bookmarks primary column</StickyHeader>
        <Tweets bookmarksValue={true} />
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>HEADER Bookmarks sitebar column</StickyHeader>
        BODY Bookmarks sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Bookmarks;
