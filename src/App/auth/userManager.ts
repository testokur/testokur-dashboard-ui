/* eslint-disable @typescript-eslint/camelcase */
import { UserManagerSettings } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

const clientRoot = `${window.location.protocol}//${window.location.host}`;

const userManagerSettings: UserManagerSettings = {
  client_id: 'testokur.web.client',
  redirect_uri: `${clientRoot}/signin-callback`,
  response_type: 'code',
  scope: 'openid profile testokurapi',
  post_logout_redirect_uri: clientRoot,
  authority: window._env_.authority || 'http://localhost:51789/',
  silent_redirect_uri: `${clientRoot}/silentRenew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  response_mode: 'query',
  clockSkew: 3000000,
};

export const userManager = createUserManager(userManagerSettings);
