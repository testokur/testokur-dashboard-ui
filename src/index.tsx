import React from 'react';
import { render } from 'react-dom';
import { App, createStore } from './App';
import { createBrowserHistory } from 'history';
import { userManager } from './App/auth';
import { loadUser } from 'redux-oidc';
import * as Sentry from '@sentry/browser';

Sentry.init({ dsn: window._env_.sentryKey });

const history = createBrowserHistory();
const store = createStore(history);
loadUser(store, userManager);

render(
  <App store={store} history={history} userManager={userManager} />,
  document.getElementById('app') as HTMLElement,
);
