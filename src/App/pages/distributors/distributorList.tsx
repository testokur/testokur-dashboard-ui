import * as _ from 'lodash';
import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { withLoading, Table } from '../../components';
import { Link } from 'react-router-dom';

interface Props {
  classes: any;
  data: any[];
}

/* eslint-disable react/display-name */
const distributorList = (props: Props) => {
  return (
    <Paper className={props.classes.root}>
      <Typography variant="h5" gutterBottom>
        BAYILER
      </Typography>
      <Table
        data={props.data}
        columns={[
          {
            title: 'E-Posta',
            render: (rowData) => <Link to={`/distributor/${rowData.userName}`}>{rowData.userName}</Link>,
          },
          {
            title: 'Kurum Adi',
            field: 'schoolName',
          },
          {
            title: 'Telefon',
            field: 'phone',
          },
          {
            title: 'Kullanici Sayisi',
            field: 'userCount',
          },
        ]}
      />
    </Paper>
  );
};

export default withLoading(distributorList) as any;
