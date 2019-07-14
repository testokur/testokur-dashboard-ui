import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { userManager } from '../auth';
import { User } from 'oidc-client';

interface Props {
  dispatch: Dispatch;
}

/* eslint-disable no-debugger*/
const signinCallback: React.FC<Props> = (props) => {
  function onSuccess(user: User) {
    debugger;
    localStorage.setItem('access_token', user.access_token);
    props.dispatch(push('/'));
  }

  function onError() {
    debugger;
    props.dispatch(push('/'));
  }
  return (
    <CallbackComponent userManager={userManager} successCallback={onSuccess} errorCallback={onError}>
      <div />
    </CallbackComponent>
  );
};

export default connect()(signinCallback);
