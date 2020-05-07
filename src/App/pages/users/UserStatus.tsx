import React from 'react';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import { Chip, makeStyles, Theme } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassFull from '@material-ui/icons/HourglassFull';
import AccessTime from '@material-ui/icons/AccessTime';
import Cancel from '@material-ui/icons/Cancel';
import { green, amber } from '@material-ui/core/colors';
import clsx from 'clsx';
import { UserStatuses } from './types';

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
    return isUndefined(props.expirationDate) || props.expirationDate > new Date()
      ? new Status('active', (<CheckCircleOutlineIcon />), UserStatuses.Active)
      : new Status('expired', (<HourglassFull />), UserStatuses.Expired);
  }

  return isNil(props.expirationDate)
    ? new Status('pending', (<AccessTime />), UserStatuses.PendingForActivation)
    : new Status('cancelled', (<Cancel />), UserStatuses.Deactivated);
}

export const UserStatus = (props: Props) => {
  const classes = useStyles();
  const status = getStatus(props);
  return (
    <Chip
      color="secondary"
      className={clsx(classes.chip, get(classes, `${status.name}`))}
      label={status.label}
      icon={status.icon}
    />
  );
};
