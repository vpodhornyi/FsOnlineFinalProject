import React from "react";
import {
  ColumnWrapper,
  PrimaryColumn,
  PrimaryHeader,
  SitebarColumn,
  StickyHeader,
} from "../../components";
import Tweets from "../Home/Tweets";
import Header from "./Header";
import {
  getBookmarksState,
  loadingTweetsState,
} from "../../redux/tweet/selector";
import { useSelector } from "react-redux";
import EmptyBookmark from "./EmptyBookmark";
import { Searchbar } from "../../components/Searchbar";
import { URLS } from "../../services/API";
import Loading from "../../components/Loader/Loading";

const Bookmarks = () => {
  const bookmarks = useSelector(getBookmarksState);
  const loadingTweets = useSelector(loadingTweetsState);
  const bookmarkPage = bookmarks.data.length ? (
    <Tweets stateValue={{ name: "bookmarks", url: URLS.TWEET.BOOKMARKS }} />
  ) : (
    <EmptyBookmark />
  );
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={<Header />} isBack={true} />

        <Tweets stateValue={{ name: "bookmarks", url: URLS.TWEET.BOOKMARKS }} />
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
