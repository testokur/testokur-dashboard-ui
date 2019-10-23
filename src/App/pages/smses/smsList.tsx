import * as _ from 'lodash';
import React from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import { tableIcons, withLoading } from '../../components';
import { Sms } from './types';
import { styles } from './styles';
import { formatDateTime } from '../../helpers';
import { Link } from 'react-router-dom';
import { SmsStatus } from './smsStatus';

interface Props {
  classes: any;
  data: Sms[];
}

/* eslint-disable react/display-name */
const component = (props: Props) => {
  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        Bugun Gonderilen Sms&apos;ler
      </Typography>
      <MaterialTable
        icons={tableIcons}
        data={props.data}
        columns={[
          {
            title: 'Telefon',
            render: (rowData) => <Link to={{ pathname: `/smses/${rowData.id}`, state: rowData }}>{rowData.phone}</Link>,
          },
          {
            title: 'Kullanici',
            field: 'userEmail',
          },
          {
            title: 'Baslik',
            field: 'subject',
          },
          {
            title: 'Icerik',
            render: (rowData) => <span>{rowData.body.substring(0, 20)}...</span>,
          },
          {
            title: 'Istek Zamani',
            render: (rowData) => <span>{formatDateTime(new Date(rowData.createdOnDateTimeUtc))}</span>,
          },
          {
            title: 'Iletim Zamani',
            render: (rowData) => <span>{formatDateTime(new Date(rowData.responseDateTimeUtc))}</span>,
          },
          {
            title: 'Durum',
            render: (rowData) => <SmsStatus status={rowData.status} />,
          },
        ]}
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
          showTitle: false,
          actionsColumnIndex: -1,
          pageSize: 500,
          pageSizeOptions: [100, 500, 1000, 10000],
          searchFieldAlignment: 'left',
        }}
      />
    </Paper>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(component) as any);
