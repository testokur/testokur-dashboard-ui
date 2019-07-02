import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { default as changePasswordReducer } from './pages/changePassword/reducer';
import { default as usersReducer } from './pages/home/reducer';
import { default as licenseTypesReducer } from './licenseType/reducer';
import { default as citiesReducer } from './city/reducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    oidc: oidcReducer,
    changePassword: changePasswordReducer,
    users: usersReducer,
    licenseTypes: licenseTypesReducer,
    cities: citiesReducer,
  });
