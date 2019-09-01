import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { styles } from './styles';

interface Props {
  key: number;
  classes: any;
  path: string;
  title: string;
  icon: () => JSX.Element;
}

const NavLinkListItem: React.FC<Props> = (props) => {
  return (
    <ListItem key={props.key} className={props.classes.link} component={Link} to={props.path} button={true}>
      <ListItemIcon>{props.icon()}</ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  );
};

export default withStyles(styles as any, { withTheme: true })(NavLinkListItem as any) as any;
