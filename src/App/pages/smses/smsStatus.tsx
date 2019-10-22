import React from 'react';
import * as _ from 'lodash';
import { Chip, makeStyles, Theme } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassFull from '@material-ui/icons/HourglassFull';
import AccessTime from '@material-ui/icons/AccessTime';
import Cancel from '@material-ui/icons/Cancel';
import { green, amber } from '@material-ui/core/colors';
import clsx from 'clsx';

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
    padding: theme.spacing(2),
    fontSize: 12,
  },
  successful: {
    backgroundColor: green[600],
  },
  tryagain: {
    backgroundColor: theme.palette.error.dark,
  },
  failed: {
    backgroundColor: theme.palette.error.dark,
  },
  pending: {
    backgroundColor: amber[700],
  },
}));

function getStatus(props: Props): Status {
  if (props.status === 0) {
    return new Status('pending', <AccessTime />, SmsStatuses.Pending);
  }
  if (props.status === 1) {
    return new Status('successful', <CheckCircleOutlineIcon />, SmsStatuses.Successful);
  }
  if (props.status === 2) {
    return new Status('tryagain', <HourglassFull />, SmsStatuses.TryingAgain);
  }
  return new Status('failed', <Cancel />, SmsStatuses.Failed);
}

export const SmsStatus = (props: Props) => {
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
