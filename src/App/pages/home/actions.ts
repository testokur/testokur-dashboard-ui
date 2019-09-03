import { action } from 'typesafe-actions';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, User } from './types';
import { ErrorMessage } from '../../helpers';

export const fetchUsers = () => action(FETCH_USERS_REQUEST);
export const fetchSuccess = (data: User[]) => action(FETCH_USERS_SUCCESS, data);
export const fetchFailed = (error: ErrorMessage) => action(FETCH_USERS_ERROR, error);
