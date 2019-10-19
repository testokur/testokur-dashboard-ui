import React from 'react';
import { withStyles } from '@material-ui/styles';
import { IdentityStats, WebApiStats, ReportStats, NotificationStats } from './types';
import { withLoading } from '../../components';
import { styles } from './styles';

interface Props {
  classes: any;
  identityStats: IdentityStats;
  webApiStats: WebApiStats;
  reportStats: ReportStats;
  notificationStats: NotificationStats;
}

/* eslint-disable react/display-name */
const component = (props: Props) => {
  return <div />;
};

export default withStyles(styles as any, { withTheme: true })(withLoading(component) as any);
