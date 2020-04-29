import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchSuccess } from './actions';
import { sabitApiClient } from '../../modules';
import { FETCH_LICENSETYPES_REQUEST } from './types';

function callApi() {
  return sabitApiClient.get('/api/v1/license-types');
}

function* handleFetch() {
  const res = yield call(callApi);
  yield put(fetchSuccess(res));
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_LICENSETYPES_REQUEST, handleFetch);
}

export function* licenseTypeSaga() {
  yield all([fork(watchFetchRequest)]);
}
