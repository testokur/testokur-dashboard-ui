export const DELETE_USER_REQUEST = '@@user/DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = '@@user/DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = '@@user/DELETE_USER_ERROR';
export const UPDATE_USER_REQUEST = '@@user/UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = '@@user/UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = '@@user/UPDATE_USER_ERROR';

import { Guid } from 'guid-typescript';

export interface UpdateUserModel {
  id: Guid;
  updatedUserId: number;
  subjectId: string;
  schoolName: string;
  mobilePhone: string;
  cityId: number;
  districtId: number;
  firstName: string;
  lastName: string;
  email: string;
  maxAllowedDeviceCount: number;
  maxAllowedStudentCount: number;
  canScan: boolean;
  licenseTypeId: number;
  expiryDateUtc: Date;
}
