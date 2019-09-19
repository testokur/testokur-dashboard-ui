import React from 'react';
import CardIcon from './CardIcon';
import { Typography, Divider, List, Card, ListItemText, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { styles } from './Component.styles';

interface Props {
  title: string;
  classes: any;
  users: User[];
  icon: (className: string) => JSX.Element;
}

const component = (props: Props) => {
  return (
    <div className={props.classes.main}>
      <CardIcon icon={props.icon} bgColor="#1F841C" />
      <Card className={props.classes.card}>
        <Typography className={props.classes.title} color="textSecondary">
          {props.title}
        </Typography>
        <Typography variant="h2" component="h2" className={props.classes.value}>
          {props.users.length}
        </Typography>
        <Divider />
        <List>
          {props.users.map((record) => (
            <ListItem button to={`/users/${record.userName}`} component={Link} key={record.id}>
              <ListItemText primary={`${record.userName}`} className={props.classes.listItemText} />
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component);
