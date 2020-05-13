import React from 'react';
import { Drawer, IconButton, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import EmailIcon from '@material-ui/icons/Email';
import Textsms from '@material-ui/icons/Textsms';
import TableChartIcon from '@material-ui/icons/TableChart';
import { Divider, SpacingsAfter } from 'testokur-ui';
import clsx from 'clsx';
import { styles } from './styles';
import NavLinkListItem from './NavLinkListItem';

interface Props {
  handleDrawerClose: () => void;
  classes: any;
  open: boolean;
}

/* eslint-disable react/display-name */
const routes = [
  { path: '/', title: 'Ana Sayfa', icon: () => <DashboardIcon /> },
  { path: '/users', title: 'Kullanicilar', icon: () => <PeopleIcon /> },
  { path: '/distributors', title: 'Bayiler', icon: () => <SupervisedUserCircle /> },
  { path: '/emails', title: 'E-Postalar', icon: () => <EmailIcon /> },
  { path: '/smses', title: 'Smsler', icon: () => <Textsms /> },
  { path: '/statistics', title: 'Istatistikler', icon: () => <TableChartIcon /> },
];

class SideMenu extends React.Component<Props> {
  public static displayName = 'SideMenu';

  public constructor(props: Props) {
    super(props);
  }
  public render() {
    return (
      <Drawer
        variant="permanent"
        open={this.props.open}
        classes={{
          paper: clsx(this.props.classes.drawerPaper, !this.props.open && this.props.classes.drawerPaperClose),
        }}
      >
        <div className={this.props.classes.toolbarIcon}>
          <IconButton onClick={this.props.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider spacingsAfter={SpacingsAfter.Normal} />
        {routes.map((route, index) => {
          return <NavLinkListItem key={index} path={route.path} icon={route.icon} title={route.title} />;
        })}
        <Divider spacingsAfter={SpacingsAfter.Normal} />
      </Drawer>
    );
  }
}
export default withStyles(styles as any, { withTheme: true })(SideMenu as any) as any;
