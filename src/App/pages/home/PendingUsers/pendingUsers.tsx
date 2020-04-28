import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { UserList } from '../UserList';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { identityApiClient } from '../../../../modules';

export const pendingUsers = () => {
  const customerIcon = (className: string) => <CustomerIcon className={className} />;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await identityApiClient.get('/api/v1/users/pending');
      setLoading(false);
      setData(response.data);
    };
    fetchActivities();
  }, []);

  return (
    <UserList
      loading={loading}
      title={'Onay Bekleyen Kullanicilar'}
      users={_.map(data, 'userName')}
      icon={customerIcon}
      iconBgColor="#1E688A"
    />
  );
};
