import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { fetchSuccess } from './actions';
import { createSabitApiClient } from '../helpers';
import { FETCH_LICENSETYPES_REQUEST } from './types';

function callApi() {
  return createSabitApiClient().get('/api/v1/license-types');
}

function* handleFetch() {
  const res = yield call(callApi);
  yield put(fetchSuccess(res.data));
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_LICENSETYPES_REQUEST, handleFetch);
}

export function* licenseTypeSaga() {
  yield all([fork(watchFetchRequest)]);
}
