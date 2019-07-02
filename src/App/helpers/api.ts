import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

export const identityApi = axios.create({
  baseURL: window._env_.identityApiUrl,
  timeout: 20000,
});

export const webApi = axios.create({
  baseURL: window._env_.webapiUrl,
  timeout: 20000,
});
