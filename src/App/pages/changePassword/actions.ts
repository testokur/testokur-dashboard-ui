import { action } from 'typesafe-actions';
import { CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS } from './types';
import { ErrorMessage } from '../../data';

export const requestChangePassword = (currentPassword: string, newPassword: string) =>
  action(CHANGE_PASSWORD_REQUEST, { currentPassword, newPassword });
export const changePasswordSuccess = () => action(CHANGE_PASSWORD_SUCCESS);
export const changePasswordFailed = (error: ErrorMessage) => action(CHANGE_PASSWORD_ERROR, error);
