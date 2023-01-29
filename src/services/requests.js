import * as api from './api';

const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';



export const login = (requestConfig) => api.post(loginURL, requestConfig);

export const register = (requestConfig) => api.post(registerURL, requestConfig);

export const putNewUser = (requestConfig) => api.patch(`${host}/users.json`, requestConfig);

export const updateUserRepos = (requestConfig) => api.patch(`${host}/users`, requestConfig)

export const deleteUserRepo = (requestConfig) => api.del(`${host}/users`, requestConfig);

export const importNewRepo = (requestConfig) => api.patch(`${host}/users`, requestConfig);

export const getAllRepos = (requestConfig) => api.get(`${host}/users`, requestConfig);

export const getRepo = (requestConfig) => api.get(`${host}/inventar`, requestConfig);

export const postNewRepo = (requestConfig) => api.post(`${host}/inventar.json`, requestConfig);

export const updateItems = (requestConfig) => api.patch(`${host}/inventar`, requestConfig);

export const putNewItem = (requestConfig) => api.patch(`${host}/inventar`, requestConfig);

export const deleteItem = (requestConfig) => api.del(`${host}/inventar/`, requestConfig);

export const deleteRepo = (requestConfig) => api.del(`${host}/inventar/`, requestConfig);