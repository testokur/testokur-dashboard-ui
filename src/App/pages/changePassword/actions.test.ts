import { changePasswordFailed, requestChangePassword, changePasswordSuccess } from './actions';
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_ERROR } from './types';
import { ErrorMessage } from '../../data';

test('should create success action', () => {
  const action = changePasswordSuccess();
  expect(action.type).toBe(CHANGE_PASSWORD_SUCCESS);
});

test('should create request action', () => {
  const currentPassword = '123';
  const newPassword = 'abc';
  const action = requestChangePassword(currentPassword, newPassword);
  expect(action.type).toBe(CHANGE_PASSWORD_REQUEST);
  expect(action.payload.currentPassword).toBe(currentPassword);
  expect(action.payload.newPassword).toBe(newPassword);
});

test('should create fail action', () => {
  const errorMessage = 'Your request has failed';
  const action = changePasswordFailed(new ErrorMessage('500', errorMessage));
  expect(action.type).toBe(CHANGE_PASSWORD_ERROR);
  expect(action.payload.description).toBe(errorMessage);
});
