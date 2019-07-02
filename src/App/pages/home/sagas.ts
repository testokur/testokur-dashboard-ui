import { identityApi } from '../../helpers';
import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchFailed, fetchSuccess } from './actions';
import { FETCH_USERS_REQUEST } from './types';

function callApi() {
  return identityApi.get('/account/users');
}

function* handleFetch() {
  try {
    const res = yield call(callApi);
    if (res.error) {
      yield put(fetchFailed(res.error));
    } else {
      yield put(fetchSuccess(res.data));
    }
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
