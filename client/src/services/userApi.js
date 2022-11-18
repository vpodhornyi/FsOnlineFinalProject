import axios from "axios";

export const updateUser = async (id, data) => {
    const response = await axios.put(`${process.env.REACT_APP_DEV_API_URL}users/${id}`, data);
    return response?.data;
}

export const getUserById = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_DEV_API_URL}users/${id}`);
    return response?.data;
}

export const getUserByUserTag = async (userTag) => {
    const response = await axios.get(`${process.env.REACT_APP_DEV_API_URL}users/?userTag=${userTag}`);
    return response?.data;
}

export const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_DEV_API_URL}users`);
    return response?.data;
}