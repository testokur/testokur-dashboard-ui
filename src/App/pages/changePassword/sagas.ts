import { call, put, takeLatest, fork, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { identityApi, HttpStatusCode } from '../../helpers';
import { changePasswordFailed, changePasswordSuccess } from './actions';
import { CHANGE_PASSWORD_REQUEST } from './types';

type ChangePasswordResponse = AxiosResponse<any>;

function callApi(model: any) {
  return identityApi.post('/account/change-password', model);
}

function* handlePost(model: any) {
  try {
    const response: ChangePasswordResponse = yield call(callApi, model.payload);
    if (response.status == HttpStatusCode.OK) {
      yield put(changePasswordSuccess());
    } else {
      yield put(changePasswordFailed(response.data[0]));
    }
  } catch (err) {
    yield put(changePasswordFailed(err.response.data[0]));
  }
}

function* changePasswordWatcher() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, handlePost);
}

export function* changePasswordSaga() {
  yield all([fork(changePasswordWatcher)]);
}
