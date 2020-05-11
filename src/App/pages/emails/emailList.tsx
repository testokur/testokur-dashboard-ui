import React from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { withLoading, Table } from '../../components';
import { Email } from './types';
import { styles } from './styles';
import { formatDateTime } from 'testokur-utils';
import { Link } from 'react-router-dom';

interface Props {
  classes: any;
  data: Email[];
}

/* eslint-disable react/display-name */
const emailList = (props: Props) => {
  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        GONDERILMIS E-POSTALAR
      </Typography>
      <Table
        data={props.data}
        columns={[
          {
            title: 'Alici',
            field: 'receiver',
          },
          {
            title: 'Konu',
            field: 'subject',
            render: (rowData) => (
              <Link to={{ pathname: `/emails/${rowData.id}`, state: rowData }}>{rowData.subject}</Link>
            ),
          },
          {
            title: 'Gonderim Tarihi',
            field: 'sentOnUtc',
            render: (rowData) => <span>{formatDateTime(new Date(rowData.sentOnUtc))}</span>,
          },
        ]}
      />
    </Paper>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(emailList) as any);
