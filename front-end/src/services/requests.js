import * as api from './api';

const host = 'http://localhost:3000';


export const login = (requestConfig) => api.post(`${host}/users/signin`, requestConfig);

export const register = (requestConfig) => api.post(`${host}/users/signup`, requestConfig);

export const putNewUser = (requestConfig) => api.patch(`${host}`, requestConfig);

export const updateUserRepos = (requestConfig) => api.patch(`${host}`, requestConfig);

export const importNewRepo = (requestConfig) => api.patch(`${host}`, requestConfig);

export const getAllUserRepos = (requestConfig) => api.get(`${host}`, requestConfig);

export const getAllRepos = (requestConfig) => api.get(`${host}`, requestConfig);

export const getRepo = (requestConfig) => api.get(`${host}`, requestConfig);

export const postNewRepo = (requestConfig) => api.post(`${host}`, requestConfig);

export const updateItems = (requestConfig) => api.patch(`${host}`, requestConfig);

export const putNewItem = (requestConfig) => api.post(`${host}`, requestConfig);
export const editItem = (requestConfig) => api.patch(`${host}`, requestConfig);
export const editRepo = (requestConfig) => api.patch(`${host}`, requestConfig);

export const deleteItem = (requestConfig) => api.del(`${host}`, requestConfig);

export const deleteRepo = (requestConfig) => api.del(`${host}`, requestConfig);