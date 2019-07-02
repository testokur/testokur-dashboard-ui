import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { OidcProvider } from 'redux-oidc';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { UserManager } from 'oidc-client';
import { Routes } from './routes';

interface AppProps {
  store: Store;
  history: History;
  userManager: UserManager;
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <OidcProvider store={this.props.store} userManager={this.props.userManager}>
          <ConnectedRouter history={this.props.history}>
            <Routes />
          </ConnectedRouter>
        </OidcProvider>
      </Provider>
    );
  }
}

export default App;
