import * as api from './api';

const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';



export const login = (requestConfig) => api.post(loginURL, requestConfig);

export const register = (requestConfig) => api.post(registerURL, requestConfig);

// export const addBook = (requestConfig) => api.post(`${host}/books.json`, requestConfig);

// export const getBook = (requestConfig) => api.get(`${host}/books`, requestConfig);

export const getAllItems = (requestConfig) => api.get(`${host}/inventar/-NM7k7Q5H0QbkBSy-szU.json`, requestConfig);

export const updateItems = (requestConfig) => api.patch(`${host}/inventar/-NM7k7Q5H0QbkBSy-szU.json`, requestConfig);

export const putNewItem = (requestConfig) => api.patch(`${host}/inventar/-NM7k7Q5H0QbkBSy-szU.json`, requestConfig);