import * as _ from 'lodash';
import { createIdentityApiClient, createWebApiClient } from '../../helpers';
import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchFailed, fetchSuccess } from './actions';
import { FETCH_USERS_REQUEST, User } from './types';

function callIdentityApi() {
  return createIdentityApiClient().get('/account/users');
}
function callWebApi() {
  return createWebApiClient().get('/api/v1/users');
}
function getLicenseTypes() {
  return createWebApiClient().get('/api/v1/license-types');
}

function getStatus(active: boolean, expiryDateUtc?: Date): string {
  if (active) {
    return !_.isUndefined(expiryDateUtc) && expiryDateUtc > new Date() ? 'Aktif' : 'Suresi Dolmus';
  }
  return _.isNil(expiryDateUtc) ? 'Onay Bekliyor' : 'Iptal Edilmis';
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
