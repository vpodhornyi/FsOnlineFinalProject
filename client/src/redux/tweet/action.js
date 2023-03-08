import { createActions } from "../utils";
import api, { URLS } from "../../services/API";

const actions = createActions(
  {
    actions: ["CHANGE_BOOKMARK", "RESET_STATE_VALUE"],
    async: [
      "DELETE_TWEET",
      "CREATE_TWEET",
      "GET_TWEETS",
      "CHANGE_ACTIONS_TWEET",
      "HANDLER_BOOKMARK",
      "GET_CURRENT_USER_TWEETS",
      "GET_CURRENT_USER_LIKES",
      "GET_CURRENT_USER_TWEETS_AND_REPLIES",
      "HANDLER_REPLIES",
    ],
  },
  {
    prefix: "tweet",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
};

// export const getCurrentUserTweetsAndReplies =
//   (userId, userTag) => async (dispatch) => {
//     try {
//       dispatch(ACTIONS.getCurrentUserTweetsAndReplies.request());
//       const tweets = await getUserTweets(userTag);
//       const replies = await getTweetsAndReplies(userId);
//       const combinedData = [...tweets, ...replies];
//       dispatch(ACTIONS.getCurrentUserTweetsAndReplies.success(combinedData));
//     } catch (e) {
//       dispatch(ACTIONS.getCurrentUserTweetsAndReplies.fail());
//       console.log("get user replies error", e);
//     }
//   };

// export const getCurrentUserTweets =
//   (userTag = "") =>
//   async (dispatch) => {
//     try {
//       dispatch(ACTIONS.getCurrentUserTweets.request());
//       const data = await getUserTweets(userTag);
//       dispatch(ACTIONS.getCurrentUserTweets.success(data));
//     } catch (e) {
//       dispatch(ACTIONS.getCurrentUserTweets.fail());
//       console.log("get user tweets error", e);
//     }
//   };

// export const getCurrentUserLikes =
//   (userTag = "") =>
//   async (dispatch) => {
//     try {
//       dispatch(ACTIONS.getCurrentUserLikes.request());
//       const data = await getUserLikes(userTag);
//       dispatch(ACTIONS.getCurrentUserLikes.success(data));
//     } catch (e) {
//       dispatch(ACTIONS.getCurrentUserLikes.fail());
//       console.log("get user likes error", e);
//     }
//   };

export const getTweets = (url, stateItem) => {
  return async (dispatch, getState) => {
    try {
      const { tweet } = getState();
      const pageNumber = tweet[stateItem].pageNumber;
      const pageSize = tweet[stateItem].pageSize;

      dispatch(ACTIONS.getTweets.request());
      const data = await api.get(url, { params: { pageNumber, pageSize } });

      dispatch(ACTIONS.getTweets.success({ data, stateItem }));

      return data;
    } catch (err) {
      console.log("getTweetsError error - ", err);
      dispatch(ACTIONS.getTweets.fail());
      return [];
    }
  };
};
export const resetStateValue = (stateItem) => (dispatch) => {
  dispatch(ACTIONS.resetStateValue(stateItem));
};
export const createTweet = (obj) => async (dispatch) => {
  try {
    dispatch(ACTIONS.createTweet.request());
    const data = await api.post(URLS.TWEET.CREATE_TWEET, obj);

    dispatch(ACTIONS.createTweet.success(data));
  } catch (err) {
    dispatch(ACTIONS.createTweet.fail());
    console.log("createTweet error - ", err);
  }
};
export const deleteTweet = (tweetID) => async (dispatch) => {
  try {
    dispatch(ACTIONS.deleteTweet.request());
    await api.delete(URLS.TWEET._ROOT + tweetID);
    dispatch(ACTIONS.deleteTweet.success(tweetID));
  } catch (err) {
    dispatch(ACTIONS.deleteTweet.fail());
    console.log("deleteTweet error - This is not your tweet");
  }
};
export const changeActionsTweet = (obj) => async (dispatch) => {
  try {
    dispatch(ACTIONS.changeActionsTweet.request());
    const data = await api.post(URLS.TWEET.CHANGE_ACTIONS, obj);
    dispatch(ACTIONS.changeActionsTweet.success(data));
  } catch (err) {
    dispatch(ACTIONS.changeActionsTweet.fail());
    alert(err.message);
  }
};
export const changeBookmark = (id) => (dispatch) => {
  dispatch(ACTIONS.changeBookmark(id));
};

export const handlerReplies = (id) => async (dispatch) => {
  try {
    dispatch(ACTIONS.handlerReplies.request());
    const handlerReplies = await api.get(URLS.TWEET.getReplies(id));
    dispatch(ACTIONS.handlerReplies.success(handlerReplies));
  } catch (err) {
    console.log(err);
    dispatch(ACTIONS.handlerReplies.fail());
    console.log("getReplys error - ", err);
  }
};
