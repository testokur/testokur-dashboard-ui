import React from 'react';
import CardIcon from './CardIcon';
import { Typography, List, Card, ListItemText, ListItem } from '@material-ui/core';
import { Divider, SpacingsAfter } from 'testokur-ui';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { styles } from './userList.style';
import { withLoading } from '../../../components';

interface Props {
  title: string;
  classes: any;
  users: string[];
  icon: (className: string) => JSX.Element;
  iconBgColor: string;
  loading: boolean;
}
const userList = (props: Props) => {
  return (
    <div className={props.classes.main}>
      <CardIcon icon={props.icon} bgColor={props.iconBgColor} />
      <Card className={props.classes.card}>
        <Typography className={props.classes.title} color="textSecondary">
          {props.title}
        </Typography>
        <Typography variant="h2" component="h2" className={props.classes.value}>
          {props.users.length}
        </Typography>
        <Divider spacingsAfter={SpacingsAfter.Smallest} />
        <List className={props.classes.list}>
          {props.users.map((record) => (
            <ListItem button to={`/users/${record}`} component={Link} key={record}>
              <ListItemText primary={`${record}`} className={props.classes.listItemText} />
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(userList));
