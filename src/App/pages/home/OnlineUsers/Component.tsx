import React, { useEffect } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import { connect } from 'react-redux';
import { UserList } from '../UserList';
import AppState from '../../../AppState';
import { fetchOnlineUsers } from './actions';

interface PropsFromState {
  users: string[];
}

interface PropsFromDispatch {
  fetchOnlineUsers: typeof fetchOnlineUsers;
}

type Props = PropsFromState & PropsFromDispatch;

const component = (props: Props) => {
  const onlineUserIcon = (className: string) => <PeopleIcon className={className} />;
  props.fetchOnlineUsers();
  useEffect(() => {
    const interval = setInterval(() => {
      props.fetchOnlineUsers();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <UserList title={'Online Kullanicilar'} users={props.users} icon={onlineUserIcon} iconBgColor="#2B8A1E" />;
};

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
)(component);
