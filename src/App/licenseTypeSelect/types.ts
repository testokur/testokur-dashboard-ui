export const FETCH_LICENSETYPES_REQUEST = '@@webapi/FETCH_LICENSETYPES_REQUEST';
export const FETCH_LICENSETYPES_SUCCESS = '@@webapi/FETCH_LICENSETYPES_SUCCESS';

export interface LicenseTypeModel {
  id: number;
  name: string;
  maxAllowedDeviceCount: number;
  maxAllowedRecordCount: number;
  canScan: boolean;
}
export interface LicenseTypeState {
  readonly loading: boolean;
  readonly data: LicenseTypeModel[];
}
