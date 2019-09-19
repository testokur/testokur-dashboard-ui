import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { createWebApiClient } from '../../../helpers';
import { fetchOnlineUsersSuccess } from './actions';
import { FETCH_ONLINE_USERS_REQUEST } from './types';

function callApi() {
  return createWebApiClient().get('/api/v1/users/online');
}

function* handleFetch() {
  const res = yield call(callApi);
  yield put(fetchOnlineUsersSuccess(res.data));
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_ONLINE_USERS_REQUEST, handleFetch);
}

export function* onlineUsersSaga() {
  yield all([fork(watchFetchRequest)]);
}
