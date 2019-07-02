export const CHANGE_PASSWORD_REQUEST = '@@user/CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = '@@user/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = '@@user/CHANGE_PASSWORD_ERROR';

export interface ChangePasswordState {
  readonly loading: boolean;
  readonly success: boolean;
  readonly message?: string;
}
