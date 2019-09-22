/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { User } from '../../home/types';
import { tableIcons } from '../../../components';
import { createIdentityApiClient, formatDateTime } from '../../../helpers';

interface Props {
  user: User;
}

const component = (props: Props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await createIdentityApiClient().get(`/api/v1/user-activities?userId=${props.user.subjectId}`);
      setData(response.data);
    };
    fetchActivities();
  }, []);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Kullanici Aktivite Loglari"
        columns={[
          {
            title: 'Islem',
            field: 'type',
          },
          {
            title: 'Tarih/Zaman',
            field: 'dateTimeUtc',
            render: (rowData) => <span>{formatDateTime(new Date(rowData.dateTimeUtc))}</span>,
          },
          {
            title: 'Islemi Yapan Kullanici',
            field: 'createdBy',
          },
        ]}
        data={data}
        localization={{
          body: {
            emptyDataSourceMessage: 'Gösterilecek kayıt yok',
          },
          header: {
            actions: 'Islemler',
          },
          toolbar: {
            searchTooltip: 'Arama',
            searchPlaceholder: 'Arama',
          },
          pagination: {
            labelRowsSelect: 'satır',
            labelDisplayedRows: '{count} satırdan {from}-{to} arası',
            firstTooltip: 'İlk Sayfa',
            previousTooltip: 'Önceki Sayfa',
            nextTooltip: 'Sonraki Sayfa',
            lastTooltip: 'Son Sayfa',
          },
        }}
        options={{
          actionsColumnIndex: -1,
          search: false,
          pageSize: 5,
          pageSizeOptions: [5, 10, 50],
        }}
      />
    </div>
  );
};

export default component;
