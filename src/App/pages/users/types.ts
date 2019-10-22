import { Guid } from 'guid-typescript';

export const UserStatuses = {
  Active: 'Aktif',
  Expired: 'Suresi Dolmus',
  Deactivated: 'Iptal Edilmis',
  PendingForActivation: 'Onay Bekliyor',
};

export interface UpdateUserModel {
  id: string;
  updatedUserId: number;
  subjectId: Guid;
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
  expiryDateUtc: Date | undefined;
  active: boolean | undefined;
  notes: string;
}

export interface User {
  id: number;
  subjectId: Guid;
  userName: string;
  email: string;
  active: boolean;
  createdDateTimeUtc: Date;
  maxAllowedDeviceCount: number;
  maxAllowedStudentCount: number;
  canScan: boolean;
  licenseTypeId: number;
  licenseTypeName: string;
  startDateTimeUtc: Date | undefined;
  expiryDateUtc: Date | undefined;
  activationTimeUtc: Date | undefined;
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
  registrarFullName: string;
  registrarPhone: string;
  referrer: string;
}
