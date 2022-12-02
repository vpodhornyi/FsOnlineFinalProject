import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {Tweet} from "../../components";
import {getTweets} from "../../redux/tweet/action";

const Index = () => {
  const dispatch = useDispatch();
  const [{tweets}, setTweets] = useState({tweets: []});

  useEffect(() => {
    const fetch = async () => {
      const data = await dispatch(getTweets());
      setTweets({tweets: [...tweets, ...data]});
    }
    fetch();
  }, []);

  return (
    <BoxWrapper>
      {tweets?.filter((tweet) => tweet.tweetType === "TWEET")?.map((e, i) => {
        return (
          <div key={e.uuid}>
            <Tweet tweetInfo={e}/>
          </div>
        );
      })}
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
});

const BoxWrapper = styled(Box)(styles);

export default Index;
