import { HttpClient } from 'testokur-utils';

export const webApiClient = new HttpClient(window._env_.webapiUrl);
export const identityApiClient = new HttpClient(window._env_.identityApiUrl);
export const notificationApiClient = new HttpClient(window._env_.notificationApiUrl);
export const reportApiClient = new HttpClient(window._env_.reportApiUrl);
export const sabitApiClient = new HttpClient(window._env_.sabitApiUrl);
