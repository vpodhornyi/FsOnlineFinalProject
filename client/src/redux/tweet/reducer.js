import { ACTIONS } from "./action";

const INITIAL_STATE = {
  loading: false,

  tweets: {
    data: [],
    pageNumber: 0,
    pageSize: 8,
    totalPages: true,
  },
  bookmarks: {
    data: [],
    pageNumber: 0,
    pageSize: 8,
    totalPages: true,
  },
  replies: [],
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case String(ACTIONS.getTweets.request):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.getTweets.success):
      const { data, stateItem } = payload;
      if (data.length) {
        return {
          ...state,
          loading: false,
          [stateItem]: {
            ...state[stateItem],
            data: [...state[stateItem].data, ...data],
            pageNumber: state[stateItem].pageNumber + 1,
          },
        };
      } else {
        return {
          ...state,
          loading: false,
          [stateItem]: {
            ...state[stateItem],
            totalPages: false,
          },
        };
      }

    case String(ACTIONS.deleteTweet.success):
      return {
        ...state,
        tweets: {
          ...state.tweets,
          data: state.tweets.data.filter((el) => el.id !== payload),
        },
      };
    case String(ACTIONS.changeBookmark):
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          data: state.bookmarks.data.filter((el) => el.id !== payload),
        },
      };
    case String(ACTIONS.resetStateValue):
      return {
        ...state,
        [payload]: {
          data: [],
          pageNumber: 0,
          pageSize: 8,
          totalPages: true,
        },
      };
    case String(ACTIONS.createTweet.success):
      const { tweets } = state;
      for (let i = 0; i < tweets.data.length; i++) {
        const currentCounter = tweets.data[i].replyCounter;
        if (payload.parentTweetId === tweets.data[i].id)
          tweets.data[i].replyCounter += 1;
        if (currentCounter !== tweets.data[i].replyCounter) break;
      }
      return {
        ...state,
        tweets: { ...tweets, data: [payload, ...tweets.data] },
      };

    case String(ACTIONS.getTweets.fail):
      return {
        ...state,
        loading: false,
      };
    case String(ACTIONS.handlerReplies.success):
      return {
        ...state,
        replies: payload,
      };

    case String(ACTIONS.changeActionsTweet.success):
      const { data: dataTweet } = state.tweets;
      const { data: dataBookmarks } = state.bookmarks;
      const checkArr = (arr, objActions) => {
        const findIndex = arr.findIndex(
          (tweetState) => tweetState.id === objActions.tweet.id
        );
        if (findIndex >= 0) {
          changeActionsTweet(arr[findIndex], objActions);
        }
      };
      const changeActionsTweet = (currentTweet, objActions) => {
        const { tweet, actionType, user } = objActions;
        const findActionIndex = currentTweet.actions.findIndex((action) => {
          return action.actionType === actionType && action.user.id === user.id;
        });

        if (findActionIndex < 0) {
          currentTweet.actions.push({
            actionType: actionType,
            user: user,
          });
        } else {
          currentTweet.actions.splice(findActionIndex, 1);
        }
      };
      checkArr(dataTweet, payload);
      checkArr(dataBookmarks, payload);

      return {
        ...state,
        tweets: {
          ...state.tweets,
          data: [...dataTweet],
        },
        bookmarks: {
          ...state.bookmarks,
          data: [...dataBookmarks],
        },
      };

    default: {
      return state;
    }
  }
};
