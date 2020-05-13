import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { OidcProvider } from 'redux-oidc';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { UserManager } from 'oidc-client';
import { Routes } from './routes';
import { ThemeProvider } from 'styled-components';
import { createTheme, GlobalStyle } from 'testokur-ui';

interface AppProps {
  store: Store;
  history: History;
  userManager: UserManager;
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <ThemeProvider theme={createTheme()}>
        <GlobalStyle />
        <Provider store={this.props.store}>
          <OidcProvider store={this.props.store} userManager={this.props.userManager}>
            <ConnectedRouter history={this.props.history}>
              <Routes />
            </ConnectedRouter>
          </OidcProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
