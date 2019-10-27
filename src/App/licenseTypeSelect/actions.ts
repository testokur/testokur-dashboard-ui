import { action } from 'typesafe-actions';
import { FETCH_LICENSETYPES_REQUEST, FETCH_LICENSETYPES_SUCCESS, LicenseTypeModel } from './types';

export const fetchLicenseTypes = () => action(FETCH_LICENSETYPES_REQUEST);
export const fetchSuccess = (data: LicenseTypeModel[]) => action(FETCH_LICENSETYPES_SUCCESS, data);
