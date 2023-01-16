import axios from "axios";

export const DEV_API_URL = "http://localhost:8010/"

export const followUser = async (userId, userToFollowId) => {
    const response = await axios.put(`${DEV_API_URL}follow?userId=${userId}&userToFollowId=${userToFollowId}`);
    console.log(response)
    return response.data;
}

export const unfollowUser = async (userId, userToUnfollowId) => {
    const response = await axios.put(`${DEV_API_URL}unfollow?userId=${userId}&userToUnfollowId=${userToUnfollowId}`);
    console.log(response)
    return response.data;
}