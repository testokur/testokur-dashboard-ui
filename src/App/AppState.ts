import { OidcState } from './auth';
import { RouterState } from 'connected-react-router';
import { ChangePasswordState } from './pages/changePassword/types';
import { LicenseTypeState } from './licenseType/types';
import { CityState } from './city/types';

export default interface AppState {
  oidc: OidcState;
  router: RouterState;
  changePassword: ChangePasswordState;
  resetUserPassword: ChangePasswordState;
  licenseTypes: LicenseTypeState;
  cities: CityState;
}
