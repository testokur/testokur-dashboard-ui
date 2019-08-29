import * as _ from 'lodash';
import React from 'react';
import { Button, withStyles, MenuItem, Menu } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { styles } from './styles';
import { connect } from 'react-redux';
import { userManager } from '../../../auth';
import AppState from '../../../AppState';
import { ConfirmationDialog } from '../../../components/confirmationDialog';

interface OwnProps {
  open: boolean;
}

interface ConnectedProps {
  username: string;
  idToken: string;
}

interface StyleProps {
  classes: any;
}

type Props = OwnProps & ConnectedProps & StyleProps;

interface State {
  anchorEl: any;
  logoutDialogOpen: boolean;
}

class Component extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null,
      logoutDialogOpen: false,
    };
  }

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  private openLogoutDialog = () => {
    this.handleMenuClose();
    this.setState({ logoutDialogOpen: true });
  };
  private handleLogout = () => {
    this.setState({ logoutDialogOpen: false });
    userManager.removeUser();
    /* eslint-disable @typescript-eslint/camelcase */
    userManager.signoutRedirect({ id_token_hint: this.props.idToken });
  };

  public render() {
    return (
      <div>
        <Button
          aria-owns={this.state.anchorEl ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <span className={this.props.classes.userName}>{this.props.username}</span>
          <AccountCircle />
        </Button>
        <Menu
          className={this.props.classes.userMenu}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="menu-appbar"
        >
          <MenuItem onClick={this.handleMenuClose} component={Link} to="/changePassword">
            Parola Degistir
          </MenuItem>
          <MenuItem onClick={this.openLogoutDialog}>Oturum Kapat</MenuItem>
        </Menu>
        <ConfirmationDialog
          open={this.state.logoutDialogOpen}
          onYesClick={this.handleLogout}
          onNoClick={() => this.setState({ logoutDialogOpen: false })}
          title={'Oturum Kapat'}
          message={'Oturumu kapatmak istediginize emin misiniz?'}
        />
      </div>
    );
  }
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  return {
    idToken: _.get(state, 'oidc.user.id_token', ''),
    username: _.get(state, 'oidc.user.profile.name', ''),
    open: ownProps.open,
  };
}

export default connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(Component as any) as any);
