import React, { useEffect, useState } from 'react';
import { userService } from './userService';
import { User } from './types';
import DetailedUserList from './userList';

const userListPage = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setData(await userService.getUserList());
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <DetailedUserList data={data} loading={loading} reloadData={fetchUsers} />;
};

export default userListPage;
