import { changePasswordSaga } from '../pages/changePassword/sagas';
import { all, fork } from 'redux-saga/effects';
import { homeSaga } from '../pages/home/sagas';
import { onlineUsersSaga } from '../pages/home/OnlineUsers/sagas';
import { licenseTypeSaga } from '../licenseType/sagas';
import { citySaga } from '../city/sagas';
import { resetPasswordSaga } from '../pages/users/resetUserPassword';
import { pendingUsersSaga } from '../pages/home/PendingUsers/sagas';

export function* rootSaga() {
  yield all([
    fork(changePasswordSaga),
    fork(homeSaga),
    fork(onlineUsersSaga),
    fork(pendingUsersSaga),
    fork(licenseTypeSaga),
    fork(citySaga),
    fork(resetPasswordSaga),
  ]);
}
