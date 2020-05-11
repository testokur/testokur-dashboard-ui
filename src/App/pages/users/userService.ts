/*eslint no-undef: 0*/
import { isUndefined, isNil, find } from 'testokur-utils';
import { webApiClient, identityApiClient, sabitApiClient } from '../../../modules';
import { User, UserStatuses } from './types';

class UserService {
  public async getUser(userName: string) {
    const getIdentityUserAsync = async () => {
      return await identityApiClient.get(`/api/v1/users/${userName}/details`);
    };
    const getApiUserAsync = async () => {
      return await webApiClient.get(`/api/v1/users/${userName}`);
    };
    const getLicenseTypesAsync = async () => {
      return await sabitApiClient.get('/api/v1/license-types');
    };
    const [identityUser, apiUser, licenseTypes] = await Promise.all([
      getIdentityUserAsync(),
      getApiUserAsync(),
      getLicenseTypesAsync(),
    ]);

    return this.combineUser(identityUser, apiUser, licenseTypes);
  }

  public async getUserList() {
    const getIdentityUsersAsync = async () => {
      return await identityApiClient.get('/api/v1/users');
    };
    const getApiUsersAsync = async () => {
      return await webApiClient.get('/api/v1/users');
    };
    const getLicenseTypesAsync = async () => {
      return await sabitApiClient.get('/api/v1/license-types');
    };
    const [identityUsers, apiUsers, licenseTypes] = await Promise.all([
      getIdentityUsersAsync(),
      getApiUsersAsync(),
      getLicenseTypesAsync(),
    ]);
    const users: User[] = [];

    identityUsers.forEach((identityUser: any) => {
      apiUsers.forEach((apiUser: any) => {
        if (identityUser.id === apiUser.subjectId) {
          users.push(this.combineUser(identityUser, apiUser, licenseTypes));
        }
      });
    });
    return users;
  }

  private combineUser(identityUser: any, apiUser: any, licenseTypes: any[]) {

    const user: User = {
      ...identityUser,
      ...apiUser,
      licenseTypeName: find(licenseTypes, (l) => l.id === identityUser.licenseTypeId).name,
    };
    user.expiryDateUtc = isNil(identityUser.expiryDateUtc) ? undefined : new Date(identityUser.expiryDateUtc);
    user.startDateTimeUtc = isNil(identityUser.startDateTimeUtc) ? undefined : new Date(identityUser.startDateTimeUtc);
    user.activationTimeUtc = isNil(identityUser.activationTimeUtc)
      ? undefined
      : new Date(identityUser.activationTimeUtc);
    user.createdDateTimeUtc = new Date(identityUser.createdDateTimeUtc);
    user.status = this.getStatus(user.active, user.expiryDateUtc);

    return user;
  }
  private getStatus(active: boolean, expiryDateUtc: Date | undefined): string {
    if (active) {
      return isUndefined(expiryDateUtc) || expiryDateUtc > new Date() ? UserStatuses.Active : UserStatuses.Expired;
    }
    return isNil(expiryDateUtc) ? UserStatuses.PendingForActivation : UserStatuses.Deactivated;
  }
}

export const userService: UserService = new UserService();
