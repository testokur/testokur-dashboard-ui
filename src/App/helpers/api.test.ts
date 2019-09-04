import { createIdentityApiClient, createWebApiClient, HeaderNames } from './api';

test('should create identity api with bearer token and json content-type header', () => {
  const identityApiClient = createIdentityApiClient(50000);
  expect(identityApiClient.defaults.baseURL).toBe(window._env_.identityApiUrl);
  expect(identityApiClient.defaults.headers.post[HeaderNames.ContentType]).toBe('application/json');
  expect(identityApiClient.defaults.headers.common[HeaderNames.Authorization]).toBe(
    `Bearer ${localStorage.getItem('access_token')}`,
  );
  expect(identityApiClient.defaults.timeout).toBe(50000);
});

test('should create web api with bearer token and json content-type header', () => {
  const webApiClient = createWebApiClient(50000);
  expect(webApiClient.defaults.baseURL).toBe(window._env_.webapiUrl);
  expect(webApiClient.defaults.headers.post[HeaderNames.ContentType]).toBe('application/json');
  expect(webApiClient.defaults.headers.common[HeaderNames.Authorization]).toBe(
    `Bearer ${localStorage.getItem('access_token')}`,
  );
  expect(webApiClient.defaults.timeout).toBe(50000);
});
