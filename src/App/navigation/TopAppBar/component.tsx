import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { styles } from './styles';
import clsx from 'clsx';
import UserMenu from './UserMenu/component';

interface Props {
  handleDrawerOpen: () => void;
  classes: any;
  open: boolean;
}

class Component extends React.PureComponent<Props> {
  public render() {
    return (
      <AppBar
        position="absolute"
        className={clsx(this.props.classes.appBar, this.props.open && this.props.classes.appBarShift)}
      >
        <Toolbar className={this.props.classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Sol Menu Goster"
            onClick={this.props.handleDrawerOpen}
            className={clsx(this.props.classes.menuButton, this.props.open && this.props.classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h3" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
            TestOkur
          </Typography>
          <UserMenu open={this.props.open} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(Component as any) as any;
