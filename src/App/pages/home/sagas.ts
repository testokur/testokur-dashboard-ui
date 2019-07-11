import { identityApi, webApi } from '../../helpers';
import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchFailed, fetchSuccess } from './actions';
import { FETCH_USERS_REQUEST ,User } from './types';

function callIdentityApi() {
  return identityApi.get('/account/users');
}
function callWebApi(){
  return webApi.get('/api/v1/users');
}

function* handleFetch() {
  try {
    const identitApiRes = yield call(callIdentityApi);
    const webApiRes = yield call(callWebApi);
    if (identitApiRes.error) {
      yield put(fetchFailed(identitApiRes.error));
    }
    if (webApiRes.error) {
      yield put(fetchFailed(webApiRes.error));
    }
    var users: User[] = [];

    identitApiRes.data.forEach((user: any) => {
      webApiRes.data.forEach( (apiUser:any) => {
        if(user.id === apiUser.subjectId) {
          users.push({...user, ...apiUser});
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
