import { createActions } from "../utils";
import api, { URLS } from "../../services/API";
import {getTweetReplies, getUserLikes, getUserTweets} from "../../services/tweetService";

const actions = createActions(
  {
    actions: ["CHANGE_BOOKMARK"],
    async: [
      "DELETE_TWEET",
      "CREATE_TWEET",
      "GET_TWEETS",
      "CHANGE_ACTIONS_TWEET",
      "HANDLER_BOOKMARK",
      "GET_CURRENT_USER_TWEETS",
      "GET_CURRENT_USER_LIKES",
      "GET_CURRENT_USER_REPLIES"
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

export const getCurrentUserReplies = (userId) => async dispatch => {
  try {
    dispatch(ACTIONS.getCurrentUserReplies.request());
    const data = await getTweetReplies(userId);
    dispatch(ACTIONS.getCurrentUserReplies.success(data));
  }catch (e) {
    dispatch(ACTIONS.getCurrentUserReplies.fail());
    console.log("get user replies error", e)
  }
}

export const getCurrentUserTweets = (userTag = "") => async dispatch => {
  try {
    dispatch(ACTIONS.getCurrentUserTweets.request())
    const data = await getUserTweets(userTag);
    dispatch(ACTIONS.getCurrentUserTweets.success(data))
  }catch (e) {
    dispatch(ACTIONS.getCurrentUserTweets.fail());
    console.log("get user tweets error", e);
  }
}

export const getCurrentUserLikes = (userTag = "") => async dispatch => {
  try {
    dispatch(ACTIONS.getCurrentUserLikes.request());
    const data = await getUserLikes(userTag);
    dispatch(ACTIONS.getCurrentUserLikes.success(data));
  }catch (e) {
    dispatch(ACTIONS.getCurrentUserLikes.fail());
    console.log("get user likes error", e);
  }
}

export const getTweets = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getTweets.request());
    const data = await api.get(URLS.TWEET._ROOT);
    dispatch(ACTIONS.getTweets.success(data));

    return data;
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.getTweets.fail());
    console.log("getTweets error - ", err);
  }
};
export const createTweet = (obj) => async (dispatch) => {
  try {
    dispatch(ACTIONS.createTweet.request());
    const data = await api.post(URLS.TWEET.CREATE_TWEET, obj);

    dispatch(ACTIONS.createTweet.success(data));
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.createTweet.fail());
    console.log("createTweet error - ", err);
  }
};
export const deleteTweet = (userId, tweetID) => async (dispatch) => {
  try {
    dispatch(ACTIONS.deleteTweet.request());
    const data = await api.delete(`${URLS.TWEET._ROOT + userId}/${tweetID}`);
    console.log(tweetID);
    dispatch(ACTIONS.deleteTweet.success(tweetID));
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.deleteTweet.fail());
    alert("deleteTweet error - This is not your tweet");
  }
};
export const changeActionsTweet = (obj) => async (dispatch) => {
  try {
    dispatch(ACTIONS.changeActionsTweet.request());
    const data = await api.post(URLS.TWEET.CHANGE_ACTIONS, obj);
    dispatch(ACTIONS.changeActionsTweet.success(data));
    return data;
  } catch (err) {
    dispatch(ACTIONS.changeActionsTweet.fail());
    alert(err.message);
  }
};
export const changeBookmark = (id) => (dispatch) => {
  dispatch(ACTIONS.changeBookmark(id));
};
export const handlerBookmark = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.handlerBookmark.request());
    const bookmarksId = await api.get(URLS.TWEET.BOOKMARKS);
    dispatch(ACTIONS.handlerBookmark.success(bookmarksId));

  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.handlerBookmark.fail());
    console.log("getBookmarks error - ", err);
  }
};
