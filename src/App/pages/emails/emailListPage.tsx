import React, { useEffect, useState } from 'react';
import { Email } from './types';
import { createNotificationApiClient } from '../../helpers/api';
import EmailList from './emailList';

const component = () => {
  const [data, setData] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    setData((await createNotificationApiClient().get(`/api/v1/emails`)).data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return <EmailList data={data} loading={loading} />;
};

export default component;
