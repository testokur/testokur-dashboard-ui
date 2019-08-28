import { changePasswordSaga } from '../pages/changePassword/sagas';
import { all, fork } from 'redux-saga/effects';
import { homeSaga } from '../pages/home/sagas';
import { licenseTypeSaga } from '../licenseType/sagas';
import { citySaga } from '../city/sagas';
import { resetPasswordSaga } from '../pages/users/resetUserPassword';

export function* rootSaga() {
  yield all([fork(changePasswordSaga), fork(homeSaga), fork(licenseTypeSaga), fork(citySaga), fork(resetPasswordSaga)]);
}
