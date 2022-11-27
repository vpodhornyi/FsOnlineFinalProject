import { ACTIONS } from "./action";

const INITIAL_STATE = {
  tweets: [],
};
export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case String(ACTIONS.deleteTweet.success):
      return {
        ...state,
        tweets: state.tweets.filter((el) => el.id !== payload),
      };
    case String(ACTIONS.createTweet.success):
      return {
        ...state,
        tweets: [...state.tweets, payload],
      };

    case String(ACTIONS.getTweets.success):
      return {
        ...state,
        tweets: payload,
      };

    default:
      return state;
  }
};
