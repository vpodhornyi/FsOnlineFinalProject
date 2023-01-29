import api, {URLS} from "./API";

export const getUserLikes = async userTag => {
    return await api.get(`${URLS.TWEET.USER_LIKES}?userTag=${userTag}`);
}

export const getUserTweets = async userTag => {
    return await api.get(`${URLS.TWEET.USER_TWEETS}?userTag=${userTag}`);
}