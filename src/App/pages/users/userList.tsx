import * as _ from 'lodash';
import dateformat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { styles } from './styles';
import { User } from '../home/types';
import AppState from '../../AppState';
import { tableIcons, withLoading } from '../../components';
import Sms from '@material-ui/icons/Sms';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import { fetchUsers } from '../home/actions';
import { SendSmsDialog } from './SendSmsDialog';
import { createWebApiClient } from '../../helpers';
import { AddSmsDialog } from './smsDetails/AddSmsDialog';
import { ConfirmationDialog } from '../../components';

interface ComponentProps {
  classes: any;
}

interface PropsFromState {
  users: User[];
}

interface PropsFromDispatch {
  fetchUsers: typeof fetchUsers;
}

type Props = PropsFromState & ComponentProps & PropsFromDispatch;

/* eslint-disable react/display-name */
const component: React.FC<Props> = (props) => {
  useEffect(() => {
    if (_.isEmpty(props.users)) {
      props.fetchUsers();
    }
  }, []);
  const [smsDialogOpen, setSmsDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [addSmsCreditDialogOpen, setAddSmsCreditDialogOpen] = useState(false);
  const [user, setUser] = useState<User | User[]>();

  const handleSendSms = async (body: string): Promise<boolean> => {
    await createWebApiClient().post('/api/v1/sms/send-admin', { receiver: _.get(user, 'phone', ''), body: body });
    return true;
  };

  const handleAddCredit = async (amount: number) => {
    setAddSmsCreditDialogOpen(false);
    await createWebApiClient().post('/api/v1/sms/add-credits', { userId: _.get(user, 'id', ''), amount: amount });
    props.fetchUsers();
  };

  const deleteUser = async () => {
    await createWebApiClient().delete(`/api/v1/users/${_.get(user, 'id', '')}`);
    setDeleteUserDialogOpen(false);
    props.fetchUsers();
  };

  return (
    <div>
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
            render: (rowData) => <span>{dateformat(rowData.expiryDateUtc, 'dd.mm.yyyy HH:MM')}</span>,
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
        data={props.users}
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
        ]}
        options={{
          actionsColumnIndex: -1,
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
    </div>
  );
};

const mapStateToProps = ({ users }: AppState) => ({
  users: users.data,
  loading: users.loading,
});

const mapDispatchToProps = {
  fetchUsers,
};

const styled = withStyles(styles as any, { withTheme: true })(withLoading(component) as any);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styled as any);
