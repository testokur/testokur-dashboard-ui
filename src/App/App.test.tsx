import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { userManager } from './auth';
import { createStore } from '.';

const history = createBrowserHistory();
const store = createStore(history);

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} history={history} userManager={userManager} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
