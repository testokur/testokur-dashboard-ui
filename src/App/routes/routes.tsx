import * as React from 'react';
import * as _ from 'lodash';
import { User } from 'oidc-client';
import { CircularProgress, Box } from '@material-ui/core';
import SigninCallback from '../pages/signinCallback';
import { connect } from 'react-redux';
import AppState from '../AppState';
import { PrivateRoute, userManager } from '../auth';
import { Dashboard } from '../dashboard';

interface Props {
  user: User;
  isLoadingUser: boolean;
  location: any;
}

const routes = (props: Props) => {
  const spinner = () => {
    return (
      <Box display="flex" justifyContent="center">
        {' '}
        <CircularProgress size={100} />{' '}
      </Box>
    );
  };
  if (props.isLoadingUser || !props.location) {
    return spinner();
  }
  /* eslint-disable no-debugger*/
  debugger;
  if (props.location.pathname === '/signin-callback') {
    return <SigninCallback />;
  }

  if (_.isNil(props.user) && props.location.pathname !== '/signin-callback') {
    userManager.signinRedirect();
    return spinner();
  }

  return <PrivateRoute component={Dashboard} />;
};

function mapStateToProps(state: AppState) {
  return {
    user: state.oidc.user,
    isLoadingUser: state.oidc.isLoadingUser,
    location: state.router.location,
  };
}

export default connect(mapStateToProps)(routes);
