import api, {URLS} from "./API";

export const getUserLikes = async userTag => {
    return await api.get(`${URLS.TWEET.USER_LIKES}?userTag=${userTag}`);
}

export const getUserTweets = async userTag => {
    return await api.get(`${URLS.TWEET.USER_TWEETS}?userTag=${userTag}`);
}

export const getTweetsAndReplies = async userId => {
    return await api.get(`${URLS.TWEET.USER_REPLIES}?id=${userId}`);
}