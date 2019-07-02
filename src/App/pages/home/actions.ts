import { action } from 'typesafe-actions';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from './types';
import { User } from 'oidc-client';
import { ErrorMessage } from '../../data';

export const fetchUsers = () => action(FETCH_USERS_REQUEST);
export const fetchSuccess = (data: User[]) => action(FETCH_USERS_SUCCESS, data);
export const fetchFailed = (error: ErrorMessage) => action(FETCH_USERS_ERROR, error);
