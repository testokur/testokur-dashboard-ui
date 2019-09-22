import React, { useEffect, useState } from 'react';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import { UserList } from '../UserList';
import { createIdentityApiClient } from '../../../helpers';

export const component = () => {
  const icon = (className: string) => <PeopleOutline className={className} />;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await createIdentityApiClient().get('/api/v1/user-activities/today-logins');
      setData(response.data);
    };
    fetchActivities();
  }, []);

  return <UserList title={'Bugun Oturum Acanlar'} users={data} icon={icon} iconBgColor="#0b9fb3" />;
};
