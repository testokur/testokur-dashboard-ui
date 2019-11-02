import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import licenseTypesReducer from './licenseTypeSelect/reducer';
import citiesReducer from './city/reducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    oidc: oidcReducer,
    licenseTypes: licenseTypesReducer,
    cities: citiesReducer,
  });
