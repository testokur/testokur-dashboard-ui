import { action } from 'typesafe-actions';
import { FETCH_PENDING_USERS_REQUEST, FETCH_PENDING_USERS_SUCCESS, IdentityUser } from './types';

export const fetchPendingUsers = () => action(FETCH_PENDING_USERS_REQUEST);
export const fetchPendingUsersSuccess = (data: IdentityUser[]) => action(FETCH_PENDING_USERS_SUCCESS, data);
