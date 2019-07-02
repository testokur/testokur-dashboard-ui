import { action } from 'typesafe-actions';
import { FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS, City } from './types';

export const fetchCityRequest = () => action(FETCH_CITIES_REQUEST);
export const fetchSuccess = (data: City[]) => action(FETCH_CITIES_SUCCESS, data);
