import * as _ from 'lodash';
import React from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import { tableIcons, withLoading } from '../../components';
import { Email } from './types';
import { styles } from './styles';
import { formatDateTime } from '../../helpers';
import { Link } from 'react-router-dom';

interface Props {
  classes: any;
  data: Email[];
}

/* eslint-disable react/display-name */
const component = (props: Props) => {
  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        GONDERILMIS E-POSTALAR
      </Typography>
      <MaterialTable
        icons={tableIcons}
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
          pageSize: 50,
          pageSizeOptions: [50, 100, 500, 1000],
          searchFieldAlignment: 'left',
        }}
      />
    </Paper>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(component) as any);
