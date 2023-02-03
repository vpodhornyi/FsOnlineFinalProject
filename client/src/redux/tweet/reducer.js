import { ACTIONS, changeBookmark } from "./action";
import { addOrFilterItem } from "../../utils/tweets";

const INITIAL_STATE = {
  loading: false,
  pageNumber: 0,
  pageSize: 4,
  totalPages: 2,
  tweets: [],
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
  replies: [],
};

export default (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    // case String(ACTIONS.setPageNumber):
    //   return {
    //     ...state,
    //     pageNumber: payload.pageNumber,
    //   };
    case String(ACTIONS.getTweetsNew.request):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.getTweetsNew.success):
      const tweetsId=state.tweets.map(tweet=>tweet.id)
      console.log(tweetsId)
      const newTweets = payload.filter(resTweet => !tweetsId.includes(resTweet.id));
      return {
        ...state,
        loading: false,
        // totalPages: payload.totalPages,//TODO
        tweets: [...state.tweets, ...newTweets],
        pageNumber: state.pageNumber+1,
      };
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
      const{tweets}=state
      for (let i = 0; i < tweets.length; i++) {
        const currentCounter=tweets[i].replyCounter
        if(payload.parentTweetId===tweets[i].id) tweets[i].replyCounter+=1;
        if(currentCounter!==tweets[i].replyCounter) break;
      }
      return {
        ...state,
        tweets: [...tweets, payload],
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
    case String(ACTIONS.handlerReplies.success):
      return {
        ...state,
        replies: payload,
      };
    case String(ACTIONS.changeBookmark):
      return {
        ...state,
        bookmarks: addOrFilterItem(state.bookmarks, payload, "bookmarks"),
      };
    case String(ACTIONS.changeActionsTweet.success):

      for (let i = 0; i < state.tweets.length; i++) {
        const currentTweet = state.tweets[i];
        const { tweet, actionType, user } = payload;
        const currentLength=currentTweet.actions.length;
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
        if(currentLength!==currentTweet.actions.length) break;
      }
      return {
        ...state,
        tweets:[ ...state.tweets]
      };

    default: {
      return state;
    }
  }
};
