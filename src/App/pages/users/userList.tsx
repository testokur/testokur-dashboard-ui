import { get } from 'testokur-utils';
import React, { useState } from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styles } from './styles';
import { withLoading, Table } from '../../components';
import Sms from '@material-ui/icons/Sms';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Update from '@material-ui/icons/Update';
import { SendSmsDialog } from './SendSmsDialog';
import { formatDateTime } from 'testokur-utils';
import { webApiClient } from '../../../modules';
import { AddSmsDialog } from './smsDetails/AddSmsDialog';
import { ConfirmationDialog } from '../../components';
import { User } from './types';

interface Props {
  classes: any;
  data: User[];
  reloadData: () => Promise<void>;
}

/* eslint-disable react/display-name */
const userList = (props: Props) => {
  const [smsDialogOpen, setSmsDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [addSmsCreditDialogOpen, setAddSmsCreditDialogOpen] = useState(false);
  const [extendUserDialogOpen, setExtendUserDialogOpen] = useState(false);
  const [user, setUser] = useState<User | User[]>();

  const handleSendSms = async (body: string): Promise<boolean> => {
    await webApiClient.post('/api/v1/sms/send-admin', { receiver: get(user, 'phone', ''), body: body });
    return true;
  };

  const handleAddCredit = async (amount: number, gift: boolean) => {
    setAddSmsCreditDialogOpen(false);
    await webApiClient.post('/api/v1/sms/add-credits', {
      userId: get(user, 'id', ''),
      amount: amount,
      gift: gift,
    });
    await props.reloadData();
  };

  const deleteUser = async () => {
    await webApiClient.delete(`/api/v1/users/${get(user, 'id', '')}`);
    setDeleteUserDialogOpen(false);
    await props.reloadData();
  };

  const extendUser = async () => {
    await webApiClient.post('/api/v1/users/extend', {
      email: get(user, 'email', ''),
      currentExpiryDateTimeUtc: get(user, 'expiryDateUtc', ''),
    });
    setExtendUserDialogOpen(false);
    await props.reloadData();
  };

  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        KULLANICILAR
      </Typography>
      <Table
        data={props.data}
        actions={[
          {
            icon: () => <DeleteForever />,
            tooltip: 'Sil',
            onClick: (event, rowData) => {
              setUser(rowData);
              setDeleteUserDialogOpen(true);
            },
          },
          {
            icon: () => <Sms />,
            tooltip: 'Sms Gonder',
            onClick: (event, rowData) => {
              setUser(rowData);
              setSmsDialogOpen(true);
            },
          },
          {
            icon: () => <AddCircleOutline />,
            tooltip: 'Sms Kredisi Ekle',
            onClick: (event, rowData) => {
              setUser(rowData);
              setAddSmsCreditDialogOpen(true);
            },
          },
          {
            icon: () => <Update />,
            tooltip: 'Lisans Uzat',
            onClick: (event, rowData) => {
              setUser(rowData);
              setExtendUserDialogOpen(true);
            },
          },
        ]}
        columns={[
          {
            title: 'E-Posta',
            field: 'userName',
            render: (rowData) => <Link to={`/users/${rowData.userName}`}>{rowData.userName}</Link>,
          },
          {
            title: 'Lisans Turu',
            field: 'licenseTypeName',
          },
          {
            title: 'Ad Soyad',
            field: 'firstName',
            customFilterAndSearch: (filter, rowData) => {
              const value = rowData.firstName.concat(' ', rowData.lastName).toLocaleUpperCase();

              return (
                value.includes(filter.toLocaleUpperCase()) ||
                value.toLocaleUpperCase().includes(filter.toLocaleUpperCase())
              );
            },
            render: (rowData) => (
              <span>
                {rowData.firstName.trim()} {rowData.lastName.trim()}
              </span>
            ),
          },
          {
            title: 'Kurum Adi',
            field: 'schoolName',
          },
          {
            title: 'Bitiş Tarihi',
            render: (rowData) => <span>{formatDateTime(rowData.expiryDateUtc)}</span>,
          },
          {
            title: 'Telefon',
            field: 'phone',
          },
          {
            title: 'Durum',
            field: 'status',
          },
          {
            title: 'Şehir-İlçe',
            field: 'cityName',
            render: (rowData) => (
              <span>
                {rowData.cityName} {rowData.districtName}
              </span>
            ),
          },
        ]}
      />
      <SendSmsDialog
        onSubmit={handleSendSms}
        open={smsDialogOpen}
        onClose={() => setSmsDialogOpen(false)}
        phone={get(user, 'phone', '')}
      />
      <AddSmsDialog
        open={addSmsCreditDialogOpen}
        onSubmit={handleAddCredit}
        onClose={() => setAddSmsCreditDialogOpen(false)}
      />
      <ConfirmationDialog
        open={deleteUserDialogOpen}
        onNoClick={() => setDeleteUserDialogOpen(false)}
        onYesClick={deleteUser}
        title={'Kullanici Silme'}
        message={get(user, 'email', '') + ' e-posta adresine sahip kullaniciyi silmek istediginize emin misiniz?'}
      />
      <ConfirmationDialog
        open={extendUserDialogOpen}
        onNoClick={() => setExtendUserDialogOpen(false)}
        onYesClick={extendUser}
        title={'Kullanici Lisans Uzatma'}
        message={
          get(user, 'email', '') +
          ' e-posta adresine sahip kullanicinin lisansi 1 yil uzatilacaktir. Onayliyor musunuz?'
        }
      />
    </Paper>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(userList) as any);
