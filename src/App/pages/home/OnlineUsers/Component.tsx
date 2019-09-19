import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { connect } from 'react-redux';
import { UserList } from '../UserList';
import { withLoading } from '../../../components';
import AppState from '../../../AppState';
import { fetchOnlineUsers } from './actions';

interface PropsFromState {
  users: string[];
}

interface PropsFromDispatch {
  fetchOnlineUsers: typeof fetchOnlineUsers;
}

type Props = PropsFromState & PropsFromDispatch;

class Component extends React.Component<Props> {
  public async componentDidMount() {
    this.props.fetchOnlineUsers();
  }
  public render() {
    const onlineUserIcon = (className: string) => <PeopleIcon className={className} />;
    return (
      <UserList title={'Online Kullanicilar'} users={this.props.users} icon={onlineUserIcon} iconBgColor="#2B8A1E" />
    );
  }
}

const mapStateToProps = ({ onlineUsers }: AppState) => ({
  loading: onlineUsers.loading,
  users: onlineUsers.data,
});

const mapDispatchToProps = {
  fetchOnlineUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoading(Component) as any);
