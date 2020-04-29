import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { IdentityStats, WebApiStats, ReportStats, NotificationStats } from './types';
import { identityApiClient, webApiClient, reportApiClient, notificationApiClient } from '../../../modules';
import Table from './table';
import { styles } from './styles';

interface Props {
  classes: any;
}

const statistics = (props: Props) => {
  const [identityStats, setIdentityStats] = useState<IdentityStats>();
  const [webApiStats, setWebApiStats] = useState<WebApiStats>();
  const [reportStats, setReportStats] = useState<ReportStats>();
  const [notificationStats, setNotificationStats] = useState<NotificationStats>();
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setIdentityStats((await identityApiClient.get('api/v1/stats')));
    setWebApiStats((await webApiClient.get('api/v1/statistics')));
    setReportStats((await reportApiClient.get('api/v1/report-requests')));
    setNotificationStats((await notificationApiClient.get('api/v1/statistics')));
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

export default withStyles(styles as any, { withTheme: true })(statistics as any) as any;
