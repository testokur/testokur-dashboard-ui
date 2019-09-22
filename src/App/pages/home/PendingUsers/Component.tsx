import React, { useEffect } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { UserList } from '../UserList';
import AppState from '../../../AppState';
import { fetchPendingUsers } from './actions';
import { IdentityUser } from './types';
import CustomerIcon from '@material-ui/icons/PersonAdd';

interface PropsFromState {
  users: IdentityUser[];
}

interface PropsFromDispatch {
  fetchPendingUsers: typeof fetchPendingUsers;
}

type Props = PropsFromState & PropsFromDispatch;

const component = (props: Props) => {
  const customerIcon = (className: string) => <CustomerIcon className={className} />;
  useEffect(() => {
    props.fetchPendingUsers();
  }, []);
  return (
    <UserList
      title={'Onay Bekleyen Kullanicilar'}
      users={_.map(props.users, 'userName')}
      icon={customerIcon}
      iconBgColor="#1E688A"
    />
  );
};

const mapStateToProps = ({ pendingUsers }: AppState) => ({
  loading: pendingUsers.loading,
  users: pendingUsers.data,
});

const mapDispatchToProps = {
  fetchPendingUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
