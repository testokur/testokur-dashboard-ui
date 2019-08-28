export const FETCH_USERS_REQUEST = '@@user/FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = '@@user/FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = '@@user/FETCH_USERS_ERROR';

export interface LoginDevice {
  id: number;
  device_id: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  active: boolean;
  createdDateTimeUtc: Date;
  maxAllowedDeviceCount: number;
  maxAllowedStudentCount: number;
  canScan: true;
  licenseTypeId: number;
  licenseTypeName: string;
  startDateTimeUtc?: Date;
  expiryDateUtc?: Date;
  activationTimeUtc: Date;
  loginDevices: LoginDevice[];
  smsBalance: number;
  cityName: string;
  districtName: string;
  cityId: number;
  districtId: number;
  phone: string;
  firstName: string;
  lastName: string;
  schoolName: string;
  status: string;
  notes: string;
}

export interface UsersState {
  readonly loading: boolean;
  readonly success: boolean;
  readonly data: User[];
  readonly errorMessage?: string;
}
