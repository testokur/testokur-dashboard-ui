import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { userManager } from '../auth';
import { User } from 'oidc-client';
import axios from 'axios';

export const HeaderNames = {
  Authorization: 'Authorization',
};

interface Props {
  dispatch: Dispatch;
}

const signinCallback = (props: Props) => {
  function onSuccess(user: User) {
    axios.defaults.headers.common[HeaderNames.Authorization] = `Bearer ${user.access_token}`;
    props.dispatch(push('/'));
  }

  function onError() {
    props.dispatch(push('/'));
  }
  return (
    <CallbackComponent userManager={userManager} successCallback={onSuccess} errorCallback={onError}>
      <div />
    </CallbackComponent>
  );
};

export default connect()(signinCallback);
