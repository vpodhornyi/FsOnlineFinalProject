import {ACTIONS} from "./action";
import {addOrFilterItem} from "../../utils/tweets";

const INITIAL_STATE = {
    loading: false,
    tweets: [],
    bookmarks: localStorage.getItem("bookmarks") ?
        JSON.parse(localStorage.getItem("bookmarks"))
        : []

};
export default (state = INITIAL_STATE, {payload, type}) => {
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
        case String(ACTIONS.handlerBookmark):

            return {
                ...state,
                bookmarks: addOrFilterItem(state.bookmarks,payload,"bookmarks")
            };

        default: {
            return state;
        }
    }
};
