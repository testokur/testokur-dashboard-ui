import { all, fork } from 'redux-saga/effects';
import { licenseTypeSaga } from '../licenseTypeSelect/sagas';
import { citySaga } from '../city/sagas';

export function* rootSaga() {
  yield all([fork(licenseTypeSaga), fork(citySaga)]);
}
