import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Grid, Avatar, withStyles, Divider, Tabs, Tab } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import { styles } from './styles';
import { UserStatus } from './UserStatus';
import { User } from '../home/types';
import AppState from '../../AppState';
import LicenseDetails from './LicenseDetails';
import { SmsDetails } from './smsDetails';
import PersonalDetails from './personalDetails';

interface MatchParams {
  userName: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams> {
  classes: any;
}

interface PropsFromState {
  user: User;
}

type Props = PropsFromState & ComponentProps;

const component: React.FC<Props> = (props) => {
  const [value, setValue] = useState(0);
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }
  const [active, setActive] = useState(props.user.active);
  const [expiryDateUtc, setexpiryDateUtc] = useState(props.user.expiryDateUtc);

  useEffect(() => {
    setActive(props.user.active);
    setexpiryDateUtc(props.user.expiryDateUtc);
  }, [props.user.active, props.user.expiryDateUtc]);

  return (
    <div className={props.classes.root}>
      <Grid container justify="center" alignItems="center">
        <Avatar className={props.classes.avatar}>
          <PersonIcon />
        </Avatar>
        <h3>{props.user.userName}</h3>
        <UserStatus active={active} expirationDate={expiryDateUtc} />
      </Grid>
      <Divider />
      <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
        <Tab label="LISANS BILGILERI" />
        <Tab label="KISISEL BILGILER" />
        <Tab label="DIGER BILGILER" />
      </Tabs>
      {value === 0 && (
        <LicenseDetails
          user={props.user}
          onActivated={() => {
            setActive(true);
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            setexpiryDateUtc(new Date(year + 1, month, day));
          }}
        />
      )}
      {value === 1 && <PersonalDetails user={props.user} />}
      {value === 2 && <SmsDetails user={props.user} />}
    </div>
  );
};

const mapStateToProps = ({ users }: AppState, { match }: ComponentProps) => ({
  user: _.head(_.filter(users.data, { userName: match.params.userName })),
});

export default connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(component as any) as any);
