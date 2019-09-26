import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import changePasswordReducer from './pages/changePassword/reducer';
import licenseTypesReducer from './licenseType/reducer';
import citiesReducer from './city/reducer';
import { resetUserPasswordReducer } from './pages/users/resetUserPassword';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    oidc: oidcReducer,
    changePassword: changePasswordReducer,
    licenseTypes: licenseTypesReducer,
    cities: citiesReducer,
    resetUserPassword: resetUserPasswordReducer,
  });
