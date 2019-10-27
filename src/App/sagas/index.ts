import { changePasswordSaga } from '../pages/changePassword/sagas';
import { all, fork } from 'redux-saga/effects';
import { licenseTypeSaga } from '../licenseTypeSelect/sagas';
import { citySaga } from '../city/sagas';
import { resetPasswordSaga } from '../pages/users/resetUserPassword';

export function* rootSaga() {
  yield all([fork(changePasswordSaga), fork(licenseTypeSaga), fork(citySaga), fork(resetPasswordSaga)]);
}
