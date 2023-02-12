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
import {Searchbar} from "../../components/Searchbar";

const Bookmarks = () => {
  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={<Header/>}/>
          <Tweets bookmarksValue={true}/>
        </PrimaryColumn>
        <SitebarColumn>
          <StickyHeader><Searchbar/></StickyHeader>
        </SitebarColumn>
      </ColumnWrapper>
  );
};

export default Bookmarks;
