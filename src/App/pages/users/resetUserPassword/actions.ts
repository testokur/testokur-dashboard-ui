import { action } from 'typesafe-actions';
import { RESET_PASSWORD_ADMIN_REQUEST, RESET_PASSWORD_ADMIN_ERROR, RESET_PASSWORD_ADMIN_SUCCESS } from './types';
import { ErrorMessage } from '../../../data';

export const requestResetPassword = (subjectId: string, newPassword: string) =>
  action(RESET_PASSWORD_ADMIN_REQUEST, { subjectId, newPassword });
export const resetPasswordSuccess = () => action(RESET_PASSWORD_ADMIN_SUCCESS);
export const resetPasswordFailed = (error: ErrorMessage) => action(RESET_PASSWORD_ADMIN_ERROR, error);
