import {URLS} from "./API";
import api from "./API";

export const followUser = async (userId, userToFollowId) => {
    return await api.put(`${URLS.SUBSCRIBING.FOLLOW}/?userId=${userId}&userToFollowId=${userToFollowId}`);
}

export const unfollowUser = async (userId, userToUnfollowId) => {
    return await api.put(`${URLS.SUBSCRIBING.UNFOLLOW}/?userId=${userId}&userToUnfollowId=${userToUnfollowId}`);
}