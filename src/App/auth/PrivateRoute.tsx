import React from 'react';
import isNull from 'lodash/isNull';
import { CircularProgress, Box } from '@material-ui/core';
import { RouteProps, Route } from 'react-router-dom';
import AppState from '../AppState';
import { connect } from 'react-redux';
import { userManager } from './userManager';

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
      this.spinner()
    ) : (
      <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
    );
  };

  private spinner = () => {
    return (
      <Box display="flex" justifyContent="center">
        {' '}
        <CircularProgress size={100} />{' '}
      </Box>
    );
  };
}

function mapStateToProps(state: AppState, ownProps: PrivateRouteProps) {
  return {
    component: ownProps.component,
    requiresAuthentication: !state.oidc.isLoadingUser && isNull(state.oidc.user),
    location: state.router.location,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
