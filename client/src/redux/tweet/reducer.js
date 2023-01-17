import { ACTIONS, changeBookmark } from "./action";
import { addOrFilterItem } from "../../utils/tweets";

const INITIAL_STATE = {
  loading: false,
  tweets: [],
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
};

export default (state = INITIAL_STATE, { payload, type }) => {
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
    case String(ACTIONS.handlerBookmark.success):
      localStorage.setItem("bookmarks", JSON.stringify(payload));
      return {
        ...state,
        bookmarks: payload,
      };
    case String(ACTIONS.changeBookmark):
      return {
        ...state,
        bookmarks: addOrFilterItem(state.bookmarks, payload, "bookmarks"),
      };
    case String(ACTIONS.changeActionsTweet.success):
      return {
        ...state,
        tweets: state.tweets.map((currentTweet) => {
          const { tweet, actionType, user } = payload;
          if (currentTweet.id === tweet.id) {
            const findActionIndex = currentTweet.actions.findIndex((action) => {
              return (
                action.actionType === actionType && action.user.id === user.id
              );
            });
            if (findActionIndex < 0) {
              currentTweet.actions.push({
                actionType: actionType,
                user: user,
              });
            } else {
              currentTweet.actions.splice(findActionIndex, 1);
            }
          }
          return currentTweet;
        }),
      };

    default: {
      return state;
    }
  }
};
