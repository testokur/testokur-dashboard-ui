import { action } from 'typesafe-actions';
import { FETCH_ONLINE_USERS_REQUEST, FETCH_ONLINE_USERS_SUCCESS } from './types';

export const fetchOnlineUsers = () => action(FETCH_ONLINE_USERS_REQUEST);
export const fetchOnlineUsersSuccess = (data: string[]) => action(FETCH_ONLINE_USERS_SUCCESS, data);
