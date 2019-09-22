export const FETCH_PENDING_USERS_REQUEST = '@@user/FETCH_PENDING_USERS_REQUEST';
export const FETCH_PENDING_USERS_SUCCESS = '@@user/FETCH_PENDING_USERS_SUCCESS';

export interface IdentityUser {
  userName: string;
  email: string;
}

export interface PendingUsersState {
  readonly loading: boolean;
  readonly data: IdentityUser[];
}
