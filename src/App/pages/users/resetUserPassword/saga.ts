import { call, put, takeLatest, fork, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { createIdentityApiClient, HttpStatusCode } from '../../../helpers';
import { resetPasswordFailed, resetPasswordSuccess } from './actions';
import { RESET_PASSWORD_ADMIN_REQUEST } from './types';

type ResetPasswordResponse = AxiosResponse<any>;

function callApi(model: any) {
  return createIdentityApiClient().post('/account/reset-user-password-by-admin', model);
}

function* handlePost(model: any) {
  try {
    const response: ResetPasswordResponse = yield call(callApi, model.payload);
    if (response.status == HttpStatusCode.OK || response.status == HttpStatusCode.NO_CONTENT) {
      yield put(resetPasswordSuccess());
    } else {
      yield put(resetPasswordFailed(response.data[0]));
    }
  } catch (err) {
    yield put(resetPasswordFailed(err.response.data[0]));
  }
}

function* resetPasswordWatcher() {
  yield takeLatest(RESET_PASSWORD_ADMIN_REQUEST, handlePost);
}

export function* resetPasswordSaga() {
  yield all([fork(resetPasswordWatcher)]);
}
