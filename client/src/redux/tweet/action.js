import { createActions } from "../utils";
import api, { URLS } from "../../services/API";

const actions = createActions(
  {
    async: ["DELETE_TWEET", "CREATE_TWEET", "GET_TWEETS"],
  },
  {
    prefix: "tweet",
  }
);

export const ACTIONS = {
  ...actions.async,
};
export const getTweets = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getTweets.request());
    const data = await api.get("http://localhost:8010/tweets/");
    dispatch(ACTIONS.getTweets.success(data));
    return true;
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.getTweets.fail());
    console.log("isAccountExist error - ", err);
    return false;
  }
};
export const createTweet = (obj) => async (dispatch) => {
  try {
    dispatch(ACTIONS.createTweet.request());
    const data = await api.post("http://localhost:8010/tweets/create/", obj);
    dispatch(ACTIONS.createTweet.success(obj));
    return true;
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.createTweet.fail());
    console.log("isAccountExist error - ", err);
    return false;
  }
};
export const deleteTweet = (id) => async (dispatch) => {
  try {
    dispatch(ACTIONS.deleteTweet.request());
    const data = await api.delete(`http://localhost:8010/tweets/${id}`);
    dispatch(ACTIONS.deleteTweet.success(id));
    return true;
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.deleteTweet.fail());
    console.log("isAccountExist error - ", err);
    return false;
  }
};
