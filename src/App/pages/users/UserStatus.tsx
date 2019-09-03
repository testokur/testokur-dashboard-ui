import React from 'react';
import * as _ from 'lodash';
import { Chip, makeStyles, Theme } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassFull from '@material-ui/icons/HourglassFull';
import AccessTime from '@material-ui/icons/AccessTime';
import Cancel from '@material-ui/icons/Cancel';
import { green, amber } from '@material-ui/core/colors';
import clsx from 'clsx';

interface Props {
  active: boolean;
  expirationDate: Date | undefined;
}

class Status {
  public readonly name: string;
  public readonly icon: any;
  public readonly label: string;

  public constructor(name: string, icon: any, label: string) {
    this.name = name;
    this.icon = icon;
    this.label = label;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    fontSize: 20,
  },
  active: {
    backgroundColor: green[600],
  },
  expired: {
    backgroundColor: theme.palette.error.dark,
  },
  cancelled: {
    backgroundColor: theme.palette.error.dark,
  },
  pending: {
    backgroundColor: amber[700],
  },
}));

function getStatus(props: Props): Status {
  if (props.active) {
    return _.isUndefined(props.expirationDate) || props.expirationDate > new Date()
      ? new Status('active', <CheckCircleOutlineIcon />, 'Aktif')
      : new Status('expired', <HourglassFull />, 'Suresi Dolmus');
  }

  return _.isNil(props.expirationDate)
    ? new Status('pending', <AccessTime />, 'Onay Bekliyor')
    : new Status('cancelled', <Cancel />, 'Iptal Edilmis');
}

export const UserStatus = (props: Props) => {
  const classes = useStyles();
  const status = getStatus(props);
  return (
    <Chip
      color="secondary"
      className={clsx(classes.chip, _.get(classes, `${status.name}`))}
      label={status.label}
      icon={status.icon}
    />
  );
};
