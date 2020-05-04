/*eslint no-undef: 0*/
import React, { useEffect, useState } from 'react';
import { Sms } from './types';
import { notificationApiClient, webApiClient } from '../../../modules';
import SmsList from './smsList';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

interface Props {
  classes: any;
}

const smsListPage = (props: Props) => {
  const [data, setData] = useState<Sms[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSmses = async () => {
    setLoading(true);

    try {
      const getSmsesAsync = async () => {
        return (await notificationApiClient.get('/api/v1/sms/today'));
      };
      const getApiUsersAsync = async () => {
        return (await webApiClient.get('/api/v1/users'));
      };

      const [smses, apiUsers] = await Promise.all([getSmsesAsync(), getApiUsersAsync()]);

      smses.forEach((sms: Sms) => {
        apiUsers.forEach((apiUser: any) => {
          if (sms.userId === 0) {
            sms.userEmail = 'Sistem';
          }
          if (sms.userId === apiUser.id) {
            sms.userEmail = apiUser.email;
          }
        });
      });

      setData(smses);
    } catch (e) {
      // Do Nothing
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSmses();
  }, []);

  return (
    <div>
      <SmsList data={data} loading={loading} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(smsListPage as any) as any;
