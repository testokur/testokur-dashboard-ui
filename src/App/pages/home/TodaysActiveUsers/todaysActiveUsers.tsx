import React, { useEffect, useState } from 'react';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import { UserList } from '../UserList';
import { identityApiClient } from '../../../../modules';

export const todaysActiveUsers = () => {
  const icon = (className: string) => <PeopleOutline className={className} />;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await identityApiClient.get('/api/v1/user-activities/today-logins');
      setLoading(false);
      setData(response.data);
    };
    fetchActivities();
  }, []);

  return <UserList loading={loading} title={'Bugun Oturum Acanlar'} users={data} icon={icon} iconBgColor="#0b9fb3" />;
};
