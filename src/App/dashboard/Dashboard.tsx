import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SideMenu, TopAppBar } from '../navigation';
import { styles } from './style';
import { changePassword } from '../pages/changePassword';
import { Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Home } from '../pages/home';
import { UserDetails, UserListPage } from '../pages/users';
import { EmailListPage, EmailDetails } from '../pages/emails';
import { DistributorListPage, DistributorDetails } from '../pages/distributors';
import { isMobile } from 'react-device-detect';
import { Statistics } from '../pages/statistics';
import { SmsListPage, SmsDetails } from '../pages/smses';

interface DashboardState {
  open: boolean;
}
interface DashboardProps {
  classes: any;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  public constructor(props: DashboardProps) {
    super(props);
    this.state = {
      open: !isMobile,
    };
  }
  public render() {
    return this.Body();
  }
  private handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  private handleDrawerClose = () => {
    this.setState({ open: false });
  };
  private Footer = () => {
    return (
      <Typography className={this.props.classes.footer} variant="body2" color="textSecondary" align="center">
        {'TestOkur yonetim paneli. Tum haklari saklidir. Copyright © 2019.'}
      </Typography>
    );
  };
  private Body = () => {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <TopAppBar open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} />
        <SideMenu open={this.state.open} handleDrawerClose={this.handleDrawerClose} />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.toolbar} />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/changePassword" exact={true} component={changePassword} />
            <Route path="/users" exact={true} component={UserListPage} />
            <Route path="/users/:userName" exact={true} component={UserDetails} />
            <Route path="/emails" exact={true} component={EmailListPage} />
            <Route path="/emails/:id" exact={true} component={EmailDetails} />
            <Route path="/smses" exact={true} component={SmsListPage} />
            <Route path="/smses/:id" exact={true} component={SmsDetails} />
            <Route path="/statistics" exact={true} component={Statistics} />
            <Route path="/distributors" exact={true} component={DistributorListPage} />
            <Route path="/distributor/:userName" exact={true} component={DistributorDetails} />
          </Switch>
          {this.Footer()}
        </main>
      </div>
    );
  };
}

export default withStyles(styles as any, { withTheme: true })(Dashboard as any) as any;
