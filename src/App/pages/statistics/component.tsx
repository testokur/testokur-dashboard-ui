import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { IdentityStats, WebApiStats, ReportStats, NotificationStats } from './types';
import { createIdentityApiClient, createWebApiClient } from '../../helpers';
import { createReportApiClient, createNotificationApiClient } from '../../helpers/api';
import Table from './table';

interface Props {
  classes: any;
}

const component = (props: Props) => {
  const [identityStats, setIdentityStats] = useState<IdentityStats>();
  const [webApiStats, setWebApiStats] = useState<WebApiStats>();
  const [reportStats, setReportStats] = useState<ReportStats>();
  const [notificationStats, setNotificationStats] = useState<NotificationStats>();
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setIdentityStats((await createIdentityApiClient().get('api/v1/stats')).data);
    setWebApiStats((await createWebApiClient().get('api/v1/statistics')).data);
    setReportStats((await createReportApiClient().get('api/v1/report-requests')).data);
    setNotificationStats((await createNotificationApiClient().get('api/v1/statistics')).data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Table
        identityStats={identityStats}
        webApiStats={webApiStats}
        reportStats={reportStats}
        notificationStats={notificationStats}
        loading={loading}
      />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
