import { OidcState } from './auth';
import { RouterState } from 'connected-react-router';
import { LicenseTypeState } from './licenseTypeSelect/types';
import { CityState } from './city/types';

export default interface AppState {
  oidc: OidcState;
  router: RouterState;
  licenseTypes: LicenseTypeState;
  cities: CityState;
}
