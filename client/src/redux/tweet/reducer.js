import { ACTIONS } from "./action";

const INITIAL_STATE = {
  loading: false,
  tweets: [],
};
export default (state = INITIAL_STATE, { payload, type }) => {
  console.log(payload)
  switch (type) {
    case String(ACTIONS.getTweets.request):
      return {
        ...state,
        loading: true,
      };
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
        loading: false,
      };
    case String(ACTIONS.getTweets.fail):
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
