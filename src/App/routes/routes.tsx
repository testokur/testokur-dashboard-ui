import React from 'react';
import { isNil } from 'testokur-utils';
import { User } from 'oidc-client';
import SigninCallback from '../pages/signinCallback';
import { connect } from 'react-redux';
import AppState from '../AppState';
import { PrivateRoute, userManager } from '../auth';
import { Dashboard } from '../dashboard';
import { LoadingTypes, Loading } from 'testokur-ui';

interface Props {
  user: User;
  isLoadingUser: boolean;
  location: any;
}

const routes = (props: Props) => {
  const spinner = () => {
    return (
      <Loading loading={true} type={LoadingTypes.PageLoader} />
    );
  };
  if (props.isLoadingUser || !props.location) {
    return spinner();
  }

  if (props.location.pathname === '/signin-callback') {
    return <SigninCallback />;
  }

  if (isNil(props.user) && props.location.pathname !== '/signin-callback') {
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
