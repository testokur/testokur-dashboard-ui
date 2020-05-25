import React from 'react';
import { Badge, BadgeTypes, Expired, Time, Check, Cancelled } from 'testokur-ui';

export const SmsStatuses = {
  Failed: 'Hata Almis',
  TryingAgain: 'Hatali Ama Kuyrukta',
  Successful: 'Basarili',
  Pending: 'Kuyrukta Bekliyor',
};

interface Props {
  status: number;
}

class Status {
  public readonly badgeType: BadgeTypes;
  public readonly icon: any;
  public readonly label: string;

  public constructor(badgeType: BadgeTypes, icon: any, label: string) {
    this.badgeType = badgeType;
    this.icon = icon;
    this.label = label;
  }
}

function getStatus(props: Props): Status {
  if (props.status === 0) {
    return new Status(BadgeTypes.Warning, <Time />, SmsStatuses.Pending);
  }
  if (props.status === 1) {
    return new Status(BadgeTypes.Success, <Check />, SmsStatuses.Successful);
  }
  if (props.status === 2) {
    return new Status(BadgeTypes.CriticalInverted, <Expired />, SmsStatuses.TryingAgain);
  }
  return new Status(BadgeTypes.Critical, <Cancelled />, SmsStatuses.Failed);
}

export const SmsStatus = (props: Props) => {
  const status = getStatus(props);
  return (
    <Badge type={status.badgeType} ariaLabel={status.label} icon={status.icon}>
      {status.label}
    </Badge>
  );
};
