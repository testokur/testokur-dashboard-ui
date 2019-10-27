/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { createIdentityApiClient, formatDateTime } from '../../../helpers';
import { User } from '../types';
import { Table } from '../../../components';

interface Props {
  user: User;
}

const logTypes: { [id: number]: string } = {
  0: 'Kullanici Olusturuldu',
  1: 'Kullanici Aktiflestirildi',
  2: 'Basarili Oturum Acma',
  3: 'Hatali Kullanici Adi veya Parola',
  4: 'Parola Degistirildi',
  5: 'Oturum Acma Engelleme : Gecersiz Makina',
  6: 'Parola Sifirlama',
  7: 'Kullanici Pasiflestirme',
  8: 'Kullanici Guncelleme',
  9: 'Yonetici Sifre Sifirlama',
  10: 'Lisans Yenileme',
  11: 'Yonetici Masterkey ile Oturum Acma',
};
const userActivityList = (props: Props) => {
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
      <Table
        pageSizeOptions={[10, 50, 100]}
        columns={[
          {
            title: 'Islem',
            field: 'type',
            render: (rowData) => <span>{logTypes[rowData.type]}</span>,
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
      />
    </div>
  );
};

export default userActivityList;
