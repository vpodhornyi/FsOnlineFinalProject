import axios from "axios";
export const authorization = () => {
  return {
    "Content-Type": "application/json",
  };
};

const TWEETS_URL = "http://localhost:9000/tweets";
export const getTweets = async () => {
  const response = await axios({
    method: "GET",
    url: TWEETS_URL + `/`,
    headers: authorization(),
  });
  return response.data;
};
export const createTweet = async (tweet) => {
  return axios({
    method: "POST",
    url: TWEETS_URL + "/create",
    data: tweet,
    headers: authorization(),
  });
};
export const deleteTweet = async (id) => {
  return axios({
    method: "DELETE",
    url: TWEETS_URL + `/${id}`,
    headers: authorization(),
  });
};
export const updateTweetInfo = async (tweetUpdate) => {
  return axios({
    method: "PUT",
    url: TWEETS_URL + `/update`,
    data: tweetUpdate,
    headers: authorization(),
  });
};
