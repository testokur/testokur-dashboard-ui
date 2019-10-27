import * as _ from 'lodash';
import React from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { withLoading, Table } from '../../components';
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
const smsList = (props: Props) => {
  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        Bugun Gonderilen Sms&apos;ler
      </Typography>
      <Table
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
      />
    </Paper>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(smsList) as any);
