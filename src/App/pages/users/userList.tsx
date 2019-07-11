import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { styles } from './styles';
import { User } from '../home/types';
import AppState from '../../AppState';
import { tableIcons } from '../../components';

interface ComponentProps {
  classes: any;
}

interface PropsFromState {
  users: User[];
}

type Props = PropsFromState & ComponentProps;

const component: React.FC<Props> = (props) => {
  return <MaterialTable icons={tableIcons} title="KULLANICILAR"
  columns={[{ title: 'E-Posta', field: 'userName' },
  { title: 'Ad Soyad', field: 'firstName',   render: rowData => <span>{rowData.firstName} {rowData.lastName}</span> },
  { title: 'Şehir-İlçe', field: 'cityName', render: rowData => <span>{rowData.cityName} {rowData.districtName}</span> },
  { title: 'Bitiş Tarihi', field: 'expiryDateUtc' }]}
  data={props.users}
  localization={{
    body: {
      emptyDataSourceMessage: 'Gösterilecek kayıt yok'
    },
    toolbar: {
      searchTooltip: 'Arama',
      searchPlaceholder: 'Arama'
    },
    pagination: {
      labelRowsSelect: 'satır',
      labelDisplayedRows: '{count} satırdan {from}-{to} arası',
      firstTooltip: 'İlk Sayfa',
      previousTooltip: 'Önceki Sayfa',
      nextTooltip: 'Sonraki Sayfa',
      lastTooltip: 'Son Sayfa'
    }
  }}/>;
};

const mapStateToProps = ({ users }: AppState) => ({
  users: users.data,
});

export default connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(component as any) as any);
