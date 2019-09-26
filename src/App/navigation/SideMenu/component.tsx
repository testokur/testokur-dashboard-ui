import React from 'react';
import { Drawer, IconButton, Divider, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
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
];

class Component extends React.Component<Props> {
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
        <Divider />
        {routes.map((route, index) => {
          return <NavLinkListItem key={index} path={route.path} icon={route.icon} title={route.title} />;
        })}
        <Divider />
      </Drawer>
    );
  }
}
export default withStyles(styles as any, { withTheme: true })(Component as any) as any;
