export const FETCH_ONLINE_USERS_REQUEST = '@@user/FETCH_ONLINE_USERS_REQUEST';
export const FETCH_ONLINE_USERS_SUCCESS = '@@user/FETCH_ONLINE_USERS_SUCCESS';

export interface OnlineUsersState {
  readonly loading: boolean;
  readonly data: string[];
}
