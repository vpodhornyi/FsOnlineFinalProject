import api, {URLS} from "./API";

export const updateUser = async (id, data) => {
    return  await api.put(`${URLS.USERS.ROOT}/${id}`, data);
}

export const getUserById = async (id) => {
    return await api.get(`${URLS.USERS.ROOT}/${id}`);
}

export const getUserByUserTag = async (userTag) => {
    return await api.get(`${URLS.USERS.ROOT}/?userTag=${userTag}`);
}

export const getUsers = async () => {
    return await api.get(`${URLS.USERS.ROOT}/all`);
}

export const getNotFollowingUsers = async (userId, pageNumber, pageSize) => {
    return await api.get(`${URLS.USERS.RECOMANDATIONS}?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
}