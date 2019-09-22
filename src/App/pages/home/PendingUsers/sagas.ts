import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { createIdentityApiClient } from '../../../helpers';
import { fetchPendingUsersSuccess } from './actions';
import { FETCH_PENDING_USERS_REQUEST } from './types';

function callApi() {
  return createIdentityApiClient().get('/api/v1/users/pending');
}

function* handleFetch() {
  const res = yield call(callApi);
  yield put(fetchPendingUsersSuccess(res.data));
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_PENDING_USERS_REQUEST, handleFetch);
}

export function* pendingUsersSaga() {
  yield all([fork(watchFetchRequest)]);
}
