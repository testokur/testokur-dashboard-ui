import React from 'react';
import { isNil, isUndefined } from 'testokur-utils';
import { BadgeTypes, Check, Colors, Expired, Time, Cancelled, Badge, Sizes } from 'testokur-ui';

interface Props {
  active: boolean;
  expirationDate?: Date;
}

const Statuses = {
  Active: 'Aktif',
  Expired: 'Suresi Dolmus',
  Deactivated: 'Iptal Edilmis',
  PendingForActivation: 'Onay Bekliyor',
};

const component = (props: Props): JSX.Element => {
  const { active, expirationDate } = props;
  let status = Statuses.Active;
  let type: BadgeTypes = BadgeTypes.Success;
  let icon = <Check color={Colors.Success} />;

  if (active && !isUndefined(expirationDate) && expirationDate <= new Date()) {
    status = Statuses.Expired;
    type = BadgeTypes.Critical;
    icon = <Expired color={Colors.Critical} />;
  } else if (isNil(expirationDate)) {
    status = Statuses.PendingForActivation;
    type = BadgeTypes.Warning;
    icon = <Time color={Colors.Warning} />;
  } else if (!active && !isNil(expirationDate)) {
    status = Statuses.Deactivated;
    type = BadgeTypes.Critical;
    icon = <Cancelled color={Colors.Critical} />;
  }

  return (
    <Badge size={Sizes.Large} ariaLabel={status} icon={icon} type={type}>
      {status}
    </Badge>
  );
};

component.displayName = 'UserStatus';

export default component;
