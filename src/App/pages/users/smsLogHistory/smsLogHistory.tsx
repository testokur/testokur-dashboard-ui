/* eslint-disable react/display-name */
import * as React from 'react';
import { User } from '../types';
import { Table } from '../../../components';
import { formatDateTime } from '../../../helpers';
import { createNotificationApiClient } from '../../../helpers/api';

interface Props {
  user: User;
}

const smsLogHistory = (props: Props) => {
  const [data, setData] = React.useState<any | undefined>();

  React.useEffect(() => {
    const fetchSmsLogs = async () => {
      const response = await createNotificationApiClient().get(`api/v1/sms/${props.user.id}/logs`);
      setData(response.data);
    };
    fetchSmsLogs();
  }, []);

  return (
    <div>
      <Table
        pageSizeOptions={[10, 50, 100]}
        columns={[
          {
            title: 'Islem Tipi',
            //      render: (rowData) => <span>{logTypes[rowData.type]}</span>,
          },
          {
            title: 'Miktar',
            field: 'amount',
          },
          {
            title: 'Tarih/Zaman',
            field: 'dateTimeUtc',
            render: (rowData) => <span>{formatDateTime(new Date(rowData.dateTimeUtc))}</span>,
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default smsLogHistory;
