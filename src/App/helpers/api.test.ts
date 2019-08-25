import { createIdentityApiClient, createWebApiClient } from './api';

test('should create identity api with bearer token and json content-type header', () => {
  const identityApiClient = createIdentityApiClient();
  expect(identityApiClient.defaults.baseURL).toBe(window._env_.identityApiUrl);
  expect(identityApiClient.defaults.headers.post['Content-Type']).toBe('application/json');
  expect(identityApiClient.defaults.headers.common['Authorization']).toBe(
    `Bearer ${localStorage.getItem('access_token')}`,
  );
});

test('should create web api with bearer token and json content-type header', () => {
  const webApiClient = createWebApiClient();
  const identityApiClient = createIdentityApiClient();
  expect(webApiClient.defaults.baseURL).toBe(window._env_.webapiUrl);
  expect(webApiClient.defaults.headers.post['Content-Type']).toBe('application/json');
  expect(identityApiClient.defaults.headers.common['Authorization']).toBe(
    `Bearer ${localStorage.getItem('access_token')}`,
  );
});
