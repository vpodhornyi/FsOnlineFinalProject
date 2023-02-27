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
import { getBookmarksState } from "../../redux/tweet/selector";
import { useSelector } from "react-redux";
import EmptyBookmark from "./EmptyBookmark";
import { Searchbar } from "../../components/Searchbar";
import { URLS } from "../../services/API";

const Bookmarks = () => {
  const bookmarks = useSelector(getBookmarksState);
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header} />
        <Tweets stateValue={{ name: "bookmarks", url: URLS.TWEET.BOOKMARKS }} />
        {!bookmarks.data.length && <EmptyBookmark />}
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>
          <Searchbar />
        </StickyHeader>
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Bookmarks;
