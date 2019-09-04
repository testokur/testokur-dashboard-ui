import axios from 'axios';

export const HeaderNames = {
  ContentType: 'Content-Type',
  Authorization: 'Authorization',
};

axios.defaults.headers.post[HeaderNames.ContentType] = 'application/json';
axios.defaults.headers.common[HeaderNames.Authorization] = `Bearer ${localStorage.getItem('access_token')}`;

export const createIdentityApiClient = (timeOut: number = 60000) =>
  axios.create({
    baseURL: window._env_.identityApiUrl,
    timeout: timeOut,
  });

export const createWebApiClient = (timeOut: number = 60000) =>
  axios.create({
    baseURL: window._env_.webapiUrl,
    timeout: timeOut,
  });
