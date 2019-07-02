import { identityApi, webApi } from './api';

test('should create identity api with bearer token and json content-type header', () => {
  expect(identityApi.defaults.baseURL).toBe(window._env_.identityApiUrl);
  expect(identityApi.defaults.headers.post['Content-Type']).toBe('application/json');
  expect(identityApi.defaults.headers.common['Authorization']).toBe(`Bearer ${localStorage.getItem('access_token')}`);
});

test('should create web api with bearer token and json content-type header', () => {
  expect(webApi.defaults.baseURL).toBe(window._env_.webapiUrl);
  expect(webApi.defaults.headers.post['Content-Type']).toBe('application/json');
  expect(identityApi.defaults.headers.common['Authorization']).toBe(`Bearer ${localStorage.getItem('access_token')}`);
});
