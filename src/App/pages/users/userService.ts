import * as _ from 'lodash';
import { createWebApiClient, createIdentityApiClient } from '../../helpers';
import { User, UserStatuses } from './types';

class UserService {
  public async getUser(userName: string) {
    const apiUser = (await createWebApiClient().get(`/api/v1/users/${userName}`)).data;
    const identityUser = (await createIdentityApiClient().get(`/api/v1/users/${userName}/details`)).data;

    return this.combineUser(identityUser, apiUser);
  }

  public async getUserList() {
    const identityUsers = (await createIdentityApiClient().get('/api/v1/users')).data;
    const apiUsers = (await createWebApiClient().get('/api/v1/users')).data;
    const users: User[] = [];

    identityUsers.forEach((identityUser: any) => {
      apiUsers.forEach((apiUser: any) => {
        if (identityUser.id === apiUser.subjectId) {
          users.push(this.combineUser(identityUser, apiUser));
        }
      });
    });
    return users;
  }

  private combineUser(identityUser: any, apiUser: any) {
    const user: User = {
      ...identityUser,
      ...apiUser,
    };
    user.expiryDateUtc = _.isNil(identityUser.expiryDateUtc) ? undefined : new Date(identityUser.expiryDateUtc);
    user.startDateTimeUtc = _.isNil(identityUser.startDateTimeUtc)
      ? undefined
      : new Date(identityUser.startDateTimeUtc);
    user.activationTimeUtc = _.isNil(identityUser.activationTimeUtc)
      ? undefined
      : new Date(identityUser.activationTimeUtc);
    user.createdDateTimeUtc = new Date(identityUser.createdDateTimeUtc);
    user.status = this.getStatus(identityUser.active, identityUser.expiryDateUtc);

    return user;
  }
  private getStatus(active: boolean, expiryDateUtc: Date | undefined): string {
    if (active) {
      return _.isUndefined(expiryDateUtc) || expiryDateUtc > new Date() ? UserStatuses.Active : UserStatuses.Expired;
    }
    return _.isNil(expiryDateUtc) ? UserStatuses.PendingForActivation : UserStatuses.Deactivated;
  }
}

export const userService: UserService = new UserService();
