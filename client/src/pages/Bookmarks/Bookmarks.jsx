import React from "react";
import {
  ColumnWrapper,
  PrimaryColumn,
  SitebarColumn,
  StickyHeader,
  PrimaryHeader,
} from "../../components";
import Tweets from "../Home/Tweets";
import Header from "./Header";

const Bookmarks = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header}/>
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
