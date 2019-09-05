import { User } from 'oidc-client';

export interface OidcState {
  readonly isLoadingUser: boolean;
  readonly user: User;
}
