import React, { useEffect, useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { UserList } from '../UserList';
import { createWebApiClient } from '../../../helpers';

export const component = () => {
  const onlineUserIcon = (className: string) => <PeopleIcon className={className} />;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await createWebApiClient().get('/api/v1/users/online');
      setLoading(false);
      setData(response.data);
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
