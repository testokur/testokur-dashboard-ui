import { OidcState } from './auth';
import { RouterState } from 'connected-react-router';
import { ChangePasswordState } from './pages/changePassword/types';
import { UsersState } from './pages/home/types';
import { LicenseTypeState } from './licenseType/types';
import { CityState } from './city/types';
import { OnlineUsersState } from './pages/home/OnlineUsers/types';
import { PendingUsersState } from './pages/home/PendingUsers/types';

export default interface AppState {
  oidc: OidcState;
  router: RouterState;
  changePassword: ChangePasswordState;
  resetUserPassword: ChangePasswordState;
  users: UsersState;
  onlineUsers: OnlineUsersState;
  pendingUsers: PendingUsersState;
  licenseTypes: LicenseTypeState;
  cities: CityState;
}
