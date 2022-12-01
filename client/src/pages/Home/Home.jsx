import React, {useEffect} from "react";

import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, TweetForm,
  Tweet,
} from '../../components';
import {useDispatch, useSelector} from "react-redux";
import {getTweetsState, loadingTweetsState} from "../../redux/tweet/selector";
import {getTweets} from "../../redux/tweet/action";
import Loading from "../../components/Loader/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(getTweetsState);
  const loadingTweets = useSelector(loadingTweetsState);

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Home primary column
        </StickyHeader>
        <TweetForm/>
        {loadingTweets && <Loading />}
        {tweets
          .filter((tweet) => tweet.tweetType === "TWEET")
          .map((e, i) => {
            return (
              <div key={e.id}>
                <Tweet tweetInfo={e} />
              </div>
            );
          })}
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
