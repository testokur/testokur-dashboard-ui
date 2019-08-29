import { Guid } from 'guid-typescript';

export interface UpdateUserModel {
  id: Guid;
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
  expiryDateUtc: Date;
}
