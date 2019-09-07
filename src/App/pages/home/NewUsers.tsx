import React from 'react';
import * as _ from 'lodash';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Divider, List, Card, ListItemText, ListItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CardIcon from './CardIcon';
import { styles } from './NewUsers.styles';
import { User } from './types';
import { fetchUsers } from './actions';
import AppState from '../../AppState';
import { withLoading } from '../../components';

interface ComponentProps {
  classes: any;
}

interface PropsFromState {
  success: boolean;
  errorMessage?: string;
  users: User[];
}

interface PropsFromDispatch {
  fetchUsers: typeof fetchUsers;
}

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

class Component extends React.Component<Props> {
  public async componentDidMount() {
    await this.props.fetchUsers();
  }
  public render() {
    const customerIcon = (className: string) => <CustomerIcon className={className} />;
    return (
      <div className={this.props.classes.main}>
        <CardIcon icon={customerIcon} bgColor="#4caf50" />
        <Card className={this.props.classes.card}>
          <Typography className={this.props.classes.title} color="textSecondary">
            Onay Bekleyen Kullanicilar
          </Typography>
          <Typography variant="h2" component="h2" className={this.props.classes.value}>
            {this.props.users.length}
          </Typography>
          <Divider />
          <List>
            {this.props.users.map((record) => (
              <ListItem button to={`/users/${record.userName}`} component={Link} key={record.id}>
                <ListItemText primary={`${record.userName}`} className={this.props.classes.listItemText} />
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ users }: AppState) => ({
  loading: users.loading,
  success: users.success,
  errorMessage: users.errorMessage,
  users: _.filter(users.data, (u) => _.isUndefined(u.expiryDateUtc) && !u.active),
});

const mapDispatchToProps = {
  fetchUsers,
};

const styled = withStyles(styles as any, { withTheme: true })(withLoading(Component) as any);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styled);
