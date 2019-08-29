import { action } from 'typesafe-actions';
import {
  DELETE_USER_REQUEST,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UpdateUserModel,
} from './types';
import { ErrorMessage } from '../../data';

export const deleteUser = (id: number) => action(DELETE_USER_REQUEST, id);
export const deleteSuccess = () => action(DELETE_USER_SUCCESS);
export const deleteFailed = (error: ErrorMessage) => action(DELETE_USER_ERROR, error);

export const updateUser = (model: UpdateUserModel) => action(UPDATE_USER_REQUEST, model);
export const updateSuccess = () => action(UPDATE_USER_SUCCESS);
export const updateFailed = (error: ErrorMessage) => action(UPDATE_USER_ERROR, error);
