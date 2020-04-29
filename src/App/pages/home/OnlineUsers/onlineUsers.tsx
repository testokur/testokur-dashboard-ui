import React, { useEffect, useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { UserList } from '../UserList';
import { webApiClient } from '../../../../modules';

export const onlineUsers = () => {
  const onlineUserIcon = (className: string) => <PeopleIcon className={className} />;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await webApiClient.get('/api/v1/users/online');
      setLoading(false);
      setData(response);
    };
    fetchActivities();
  }, []);

  return (
    <UserList
      loading={loading}
      title={'Online Kullanicilar'}
      users={data}
      icon={onlineUserIcon}
      iconBgColor="#2B8A1E"
    />
  );
};
