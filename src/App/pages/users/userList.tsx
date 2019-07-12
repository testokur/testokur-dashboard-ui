import dateformat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { styles } from './styles';
import { User } from '../home/types';
import AppState from '../../AppState';
import { tableIcons } from '../../components';
import Sms from '@material-ui/icons/Sms';
import { fetchUsers } from '../home/actions';
import { SendSmsDialog } from './SendSmsDialog';
import { webApi } from '../../helpers';

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
    props.fetchUsers();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSendSms = async (phone: string, body: string): Promise<boolean> => {
    await webApi.post('/api/v1/sms/send-admin', { receiver: phone, body: body });
    return true;
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="KULLANICILAR"
        columns={[
          { title: 'E-Posta', field: 'userName' },
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
            icon: () => <Sms />,
            tooltip: 'Sms Gonder',
            onClick: (event, rowData) => {
              setPhone(rowData.phone);
              setDialogOpen(true);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <SendSmsDialog onSubmit={handleSendSms} open={dialogOpen} onClose={() => setDialogOpen(false)} phone={phone} />
    </div>
  );
};

const mapStateToProps = ({ users }: AppState) => ({
  users: users.data,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(component as any) as any);
