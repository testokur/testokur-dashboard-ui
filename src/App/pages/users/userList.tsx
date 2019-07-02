import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { styles } from './styles';
import { User } from '../home/types';
import AppState from '../../AppState';

interface ComponentProps {
  classes: any;
}

interface PropsFromState {
  users: User[];
}

type Props = PropsFromState & ComponentProps;

const component: React.FC<Props> = () => {
  return <MaterialTable title="KULLANICILAR" columns={[{ title: 'E-Posta', field: 'userName' }]} data={[]} />;
};

const mapStateToProps = ({ users }: AppState) => ({
  users: users,
});

export default connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(component as any) as any);
