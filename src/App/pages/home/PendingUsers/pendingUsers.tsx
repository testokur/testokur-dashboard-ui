import React, { useEffect, useState } from 'react';
import { UserList } from '../UserList';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { identityApiClient } from '../../../../modules';

interface User {
  userName: string;
}

export const pendingUsers = () => {
  const customerIcon = (className: string) => <CustomerIcon className={className} />;
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await identityApiClient.get('/api/v1/users/pending');
      setLoading(false);
      setData(response);
    };
    fetchActivities();
  }, []);

  return (
    <UserList
      loading={loading}
      title={'Onay Bekleyen Kullanicilar'}
      users={data.map((u) => u.userName)}
      icon={customerIcon}
      iconBgColor="#1E688A"
    />
  );
};
