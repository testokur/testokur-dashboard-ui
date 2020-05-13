import React from 'react';
import { isNil } from 'testokur-utils';
import { RouteProps, Route } from 'react-router-dom';
import AppState from '../AppState';
import { connect } from 'react-redux';
import { userManager } from './userManager';
import { Loading, LoadingTypes } from 'testokur-ui';

interface ConnectedProps {
  requiresAuthentication: boolean;
  location: any;
}
interface PrivateRouteProps extends RouteProps {
  component: any;
}

type Props = ConnectedProps & PrivateRouteProps;

export class PrivateRoute extends React.Component<Props> {
  public componentDidUpdate = () => {
    if (this.props.requiresAuthentication) {
      userManager.signinRedirect();
    }
  };

  public render = () => {
    const { component: Component, ...rest } = this.props;
    return this.props.requiresAuthentication ? (
      <Loading loading={true} type={LoadingTypes.PageLoader} text="Lutfen Bekleyiniz..." />
    ) : (
      <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
    );
  };
}

function mapStateToProps(state: AppState, ownProps: PrivateRouteProps) {
  return {
    component: ownProps.component,
    requiresAuthentication: !state.oidc.isLoadingUser && isNil(state.oidc.user),
    location: state.router.location,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
