import * as api from './api';

// const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';
// const host = 'https://inventory-app-3f096-default-rtdb.europe-west1.firebasedatabase.app';

// const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

// const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const host = 'http://localhost:3000';


export const login = (requestConfig) => api.post(`${host}/users/signin`, requestConfig);

export const register = (requestConfig) => api.post(`${host}/users/signup`, requestConfig);

export const putNewUser = (requestConfig) => api.patch(`${host}/users.json`, requestConfig);

export const updateUserRepos = (requestConfig) => api.patch(`${host}/users`, requestConfig)

export const deleteUserRepo = (requestConfig) => api.del(`${host}/users`, requestConfig);

export const importNewRepo = (requestConfig) => api.patch(`${host}/users`, requestConfig);

export const getAllUserRepos = (requestConfig) => api.get(`${host}`, requestConfig);

export const getAllRepos = (requestConfig) => api.get(`${host}/inventar.json`, requestConfig);

export const getRepo = (requestConfig) => api.get(`${host}`, requestConfig);

export const postNewRepo = (requestConfig) => api.post(`${host}/inventar.json`, requestConfig);

export const updateItems = (requestConfig) => api.patch(`${host}/inventar`, requestConfig);

export const putNewItem = (requestConfig) => api.post(`${host}/inventar`, requestConfig);
export const editItem = (requestConfig) => api.patch(`${host}/inventar`, requestConfig);
export const editRepo = (requestConfig) => api.patch(`${host}`, requestConfig);

export const deleteItem = (requestConfig) => api.del(`${host}/inventar/`, requestConfig);

export const deleteRepo = (requestConfig) => api.del(`${host}/inventar/`, requestConfig);