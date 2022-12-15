import {createActions} from "../utils";
import api, {URLS} from "../../services/API";

const actions = createActions(
    {
        actions: ["HANDLER_BOOKMARK"],
        async: ["DELETE_TWEET", "CREATE_TWEET", "GET_TWEETS"],
    },
    {
        prefix: "tweet",
    }
);

export const ACTIONS = {
    ...actions.actions,
    ...actions.async
};
export const getTweets = () => async (dispatch) => {
    try {
        // dispatch(ACTIONS.getTweets.request());
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
export const deleteTweet = (userId,tweetID) => async (dispatch) => {
    try {
        dispatch(ACTIONS.deleteTweet.request());
        const data = await api.delete(`${URLS.TWEET._ROOT+userId}/${tweetID}`);
      console.log(tweetID)
        dispatch(ACTIONS.deleteTweet.success(tweetID));

    } catch (err) {
        //TODO show error
        dispatch(ACTIONS.deleteTweet.fail());
       alert("deleteTweet error - This is not your tweet");
    }
};
export const handlerBookmark = (id) => dispatch => {
    dispatch(ACTIONS.handlerBookmark(id));

}
