import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchSuccess } from './actions';
import { createWebApiClient } from '../helpers';
import { FETCH_CITIES_REQUEST } from './types';

function callApi() {
  return createWebApiClient().get('/api/v1/cities');
}

function* handleFetch() {
  const res = yield call(callApi);
  yield put(fetchSuccess(res.data));
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_CITIES_REQUEST, handleFetch);
}

export function* citySaga() {
  yield all([fork(watchFetchRequest)]);
}
