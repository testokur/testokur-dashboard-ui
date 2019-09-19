import React from 'react';
import * as _ from 'lodash';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';
import { User } from './types';
import { fetchUsers } from './actions';
import AppState from '../../AppState';
import { withLoading } from '../../components';
import { UserStatuses } from './UserStatuses';
import { UserList } from './UserList';

interface PropsFromState {
  success: boolean;
  errorMessage?: string;
  users: User[];
}

interface PropsFromDispatch {
  fetchUsers: typeof fetchUsers;
}

type Props = PropsFromState & PropsFromDispatch;

class Component extends React.Component<Props> {
  public async componentDidMount() {
    this.props.fetchUsers();
  }
  public render() {
    const customerIcon = (className: string) => <CustomerIcon className={className} />;
    return (
      <UserList
        title={'Onay Bekleyen Kullanicilar'}
        users={_.map(this.props.users, 'userName')}
        icon={customerIcon}
        iconBgColor="#1E688A"
      />
    );
  }
}

const mapStateToProps = ({ users }: AppState) => ({
  loading: users.loading,
  success: users.success,
  errorMessage: users.errorMessage,
  users: _.filter(users.data, (u) => u.status === UserStatuses.PendingForActivation),
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoading(Component) as any);
