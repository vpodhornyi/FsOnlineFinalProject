import {ACTIONS} from "./action";

const INITIAL_STATE = {
    loading: false,

    tweets: {
        data: [],
        pageNumber: 0,
        pageSize: 3,
        totalPages: true,
    },
    bookmarks: {
        data: [],
        pageNumber: 0,
        pageSize: 3,
        totalPages: true,
    },
    replies: [],
};

export default (state = INITIAL_STATE, {payload, type}) => {
    switch (type) {

        case String(ACTIONS.getTweets.request):
            return {
                ...state,
                loading: true,
            };
        case String(ACTIONS.getTweets.success):
            const {data, stateItem} = payload
            const tweetsId = state[stateItem].data.map(tweet => tweet.id)
            const newTweets = data?.filter(resTweet => !tweetsId.includes(resTweet.id));
            if (newTweets.length) {
                return {
                    ...state,
                    loading: false,
                    [stateItem]: {
                        ...state[stateItem], data: [...state[stateItem].data, ...newTweets],
                        pageNumber: state[stateItem].pageNumber + 1
                    },
                }

            } else {
                return {
                    ...state,
                    loading: false,
                    [stateItem]: {
                        ...state[stateItem],
                        totalPages: false,
                    }


                }
            }

        case String(ACTIONS.deleteTweet.success):
            return {
                ...state,
                tweets: {...state.tweets, data: state.tweets.data.filter((el) => el.id !== payload)},
            };
        case String(ACTIONS.createTweet.success):
            const {tweets} = state
            for (let i = 0; i < tweets.data.length; i++) {
                const currentCounter = tweets.data[i].replyCounter
                if (payload.parentTweetId === tweets.data[i].id) tweets.data[i].replyCounter += 1;
                if (currentCounter !== tweets.data[i].replyCounter) break;
            }
            return {
                ...state,
                tweets: {...tweets, data: [...tweets.data, payload]}

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
            const {data: dataTweet} = state.tweets
            const {data: dataBookmarks} = state.bookmarks
            for (let i = 0; i < dataTweet.length; i++) {
                const currentTweet = dataTweet[i];
                const {tweet, actionType, user} = payload;
                const currentLength = currentTweet.actions.length;
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
                const findBookmarkIndex = dataBookmarks.findIndex(el => el.id === currentTweet.id)
                if (findBookmarkIndex > 0) {
                    dataBookmarks.splice(findBookmarkIndex, 1, currentTweet)
                }

                if (currentLength !== currentTweet.actions.length) break;
            }
            return {
                ...state,
                tweets: {
                    ...state.tweets, data: [
                        ...dataTweet
                    ]
                },
                bookmarks: {
                    ...state.bookmarks, data: [
                        ...dataBookmarks
                    ]
                }
            };

        default: {
            return state;
        }
    }
};
