import * as _ from 'lodash';
import { createIdentityApiClient, createWebApiClient } from '../../helpers';
import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchFailed, fetchSuccess } from './actions';
import { FETCH_USERS_REQUEST, User } from './types';
import { UserStatuses } from './UserStatuses';

function callIdentityApi() {
  return createIdentityApiClient().get('/api/v1/users');
}
function callWebApi() {
  let path = '/api/v1/users';
  if (window._env_.webapiUrl === 'http://localhost:8097') {
    path = '/api/v1/users-api';
  }
  return createWebApiClient().get(path);
}
function getLicenseTypes() {
  return createWebApiClient().get('/api/v1/license-types');
}

function getStatus(active: boolean, expiryDateUtc: Date | undefined): string {
  if (active) {
    return _.isUndefined(expiryDateUtc) || expiryDateUtc > new Date() ? UserStatuses.Active : UserStatuses.Expired;
  }
  return _.isNil(expiryDateUtc) ? UserStatuses.PendingForActivation : UserStatuses.Deactivated;
}

function* handleFetch() {
  try {
    const identitApiRes = yield call(callIdentityApi);
    const webApiRes = yield call(callWebApi);
    const licenseTypes = (yield call(getLicenseTypes)).data;

    if (identitApiRes.error) {
      yield put(fetchFailed(identitApiRes.error));
    }
    if (webApiRes.error) {
      yield put(fetchFailed(webApiRes.error));
    }
    const users: User[] = [];

    identitApiRes.data.forEach((user: any) => {
      webApiRes.data.forEach((apiUser: User) => {
        if (user.id === apiUser.subjectId) {
          const combinedUser: User = {
            ...user,
            ...apiUser,
            licenseTypeName: _.find(licenseTypes, ['id', user.licenseTypeId]).name,
          };
          combinedUser.expiryDateUtc = _.isNil(user.expiryDateUtc) ? undefined : new Date(user.expiryDateUtc);
          combinedUser.startDateTimeUtc = _.isNil(user.startDateTimeUtc) ? undefined : new Date(user.startDateTimeUtc);
          combinedUser.activationTimeUtc = _.isNil(user.activationTimeUtc)
            ? undefined
            : new Date(user.activationTimeUtc);
          combinedUser.createdDateTimeUtc = new Date(user.createdDateTimeUtc);
          combinedUser.status = getStatus(combinedUser.active, combinedUser.expiryDateUtc);
          users.push(combinedUser);
        }
      });
    });
    yield put(fetchSuccess(users));
  } catch (err) {
    yield put(fetchFailed(err.response.data[0]));
  }
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_USERS_REQUEST, handleFetch);
}

export function* homeSaga() {
  yield all([fork(watchFetchRequest)]);
}
