import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { styles } from './styles';
import { tableIcons } from '../../components';
import Sms from '@material-ui/icons/Sms';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Update from '@material-ui/icons/Update';
import { SendSmsDialog } from './SendSmsDialog';
import { createWebApiClient, formatDateTime } from '../../helpers';
import { AddSmsDialog } from './smsDetails/AddSmsDialog';
import { ConfirmationDialog } from '../../components';
import { userService } from './userService';
import { User } from './types';

interface Props {
  classes: any;
}

/* eslint-disable react/display-name */
const component = (props: Props) => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setData(await userService.getUserList());
    };
    fetchUsers();
  }, []);
  const [smsDialogOpen, setSmsDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [addSmsCreditDialogOpen, setAddSmsCreditDialogOpen] = useState(false);
  const [extendUserDialogOpen, setExtendUserDialogOpen] = useState(false);
  const [user, setUser] = useState<User | User[]>();

  const handleSendSms = async (body: string): Promise<boolean> => {
    await createWebApiClient().post('/api/v1/sms/send-admin', { receiver: _.get(user, 'phone', ''), body: body });
    return true;
  };

  const handleAddCredit = async (amount: number) => {
    setAddSmsCreditDialogOpen(false);
    await createWebApiClient().post('/api/v1/sms/add-credits', { userId: _.get(user, 'id', ''), amount: amount });
    setData(await userService.getUserList());
  };

  const deleteUser = async () => {
    await createWebApiClient().delete(`/api/v1/users/${_.get(user, 'id', '')}`);
    setDeleteUserDialogOpen(false);
    setData(await userService.getUserList());
  };

  const extendUser = async () => {
    await createWebApiClient().post('/api/v1/users/extend', {
      email: _.get(user, 'email', ''),
      currentExpiryDateTimeUtc: _.get(user, 'expiryDateUtc', ''),
    });
    setExtendUserDialogOpen(false);
    setData(await userService.getUserList());
  };

  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        KULLANICILAR
      </Typography>
      <MaterialTable
        icons={tableIcons}
        title="KULLANICILAR"
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
            render: (rowData) => (
              <span>
                {rowData.firstName} {rowData.lastName}
              </span>
            ),
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
          {
            title: 'Bitiş Tarihi',
            field: 'expiryDateUtc',
            render: (rowData) => <span>{formatDateTime(rowData.expiryDateUtc)}</span>,
          },
          {
            title: 'Sms Bakiye',
            field: 'smsBalance',
          },
          {
            title: 'Durum',
            field: 'status',
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
        options={{
          showTitle: false,
          actionsColumnIndex: -1,
          pageSize: 50,
          pageSizeOptions: [50, 100, 500, 1000],
          searchFieldAlignment: 'left',
        }}
      />
      <SendSmsDialog
        onSubmit={handleSendSms}
        open={smsDialogOpen}
        onClose={() => setSmsDialogOpen(false)}
        phone={_.get(user, 'phone', '')}
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
        message={_.get(user, 'email', '') + ' e-posta adresine sahip kullaniciyi silmek istediginize emin misiniz?'}
      />
      <ConfirmationDialog
        open={extendUserDialogOpen}
        onNoClick={() => setExtendUserDialogOpen(false)}
        onYesClick={extendUser}
        title={'Kullanici Lisans Uzatma'}
        message={
          _.get(user, 'email', '') +
          ' e-posta adresine sahip kullanicinin lisansi 1 yil uzatilacaktir. Onayliyor musunuz?'
        }
      />
    </Paper>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any);
