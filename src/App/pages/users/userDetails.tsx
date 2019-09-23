import React from 'react';
import * as _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Grid, Avatar, withStyles, Divider, Tabs, Tab, Button, Paper, Box } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { styles } from './styles';
import { UserStatus } from './UserStatus';
import LicenseDetails from './LicenseDetails';
import { SmsDetails } from './smsDetails';
import PersonalDetails from './personalDetails';
import { ResetUserPassword } from './resetUserPassword';
import { ConfirmationDialog, MessageBox } from '../../components';
import { createWebApiClient } from '../../helpers';
import { UpdateUserModel, User } from './types';
import { Guid } from 'guid-typescript';
import { UserActivityList } from './userActivityList';
import { userService } from './userService';

interface MatchParams {
  userName: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  classes: any;
}

interface State {
  tabIndex: number;
  openUpdateUserDialog: boolean;
  user: User;
  success: boolean;
  message: string;
}

class Component extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      tabIndex: 0,
      openUpdateUserDialog: false,
      user: ({} as any) as User,
      success: false,
      message: '',
    };
  }
  public async componentDidMount() {
    const user: User = await userService.getUser(this.props.match.params.userName);
    this.setState({ user: user });
  }
  public render() {
    return (
      <div>
        <div className={this.props.classes.root}>
          {this.state.success && !_.isNil(this.state.message) ? (
            <MessageBox variant="success" message={this.state.message} />
          ) : (
            <></>
          )}
          <Grid container justify="center" alignItems="center">
            <Avatar className={this.props.classes.avatar}>
              <PersonIcon />
            </Avatar>
            <h3>{this.state.user.userName}</h3>
            <UserStatus active={this.state.user.active} expirationDate={this.state.user.expiryDateUtc} />
          </Grid>
          <Divider />
          <Tabs
            value={this.state.tabIndex}
            onChange={this.handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="LISANS" />
            <Tab label="KISISEL" />
            <Tab label="DIGER" />
            <Tab label="PAROLA" />
            <Tab label="LOG" />
          </Tabs>
          {this.state.tabIndex === 0 && <LicenseDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 1 && <PersonalDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 2 && <SmsDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 3 && <ResetUserPassword user={this.state.user} />}
          {this.state.tabIndex === 4 && <UserActivityList user={this.state.user} />}
        </div>
        {this.state.tabIndex !== 3 && (
          <Box marginTop={2}>
            <Grid container justify="flex-start">
              <Grid item xs={6}>
                <Paper>
                  <Button
                    type="button"
                    onClick={() => this.setUpdateUserDialogState(true)}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Degisiklikleri Kaydet
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
        <ConfirmationDialog
          open={this.state.openUpdateUserDialog}
          title={'Guncelleme Onay'}
          message={'Yaptiginiz degisikliler kaydedilecektir. Onayliyor musunuz?'}
          onNoClick={() => this.setUpdateUserDialogState(false)}
          onYesClick={() => this.updateUser()}
        />
      </div>
    );
  }

  private handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState((prevState) => ({
      ...prevState,
      tabIndex: newValue,
    }));
  };

  private setUpdateUserDialogState = (display: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      openUpdateUserDialog: display,
    }));
  };

  private handleChange = async (newUser: User) => {
    let reFetchUsers = false;

    if (newUser.smsBalance !== this.state.user.smsBalance || newUser.active !== this.state.user.active) {
      reFetchUsers = true;
    }

    this.setState((prevState) => ({
      ...prevState,
      user: { ...prevState.user, ...newUser },
    }));

    if (reFetchUsers) {
      this.setState({ user: await userService.getUser(this.props.match.params.userName) });
    }
  };

  private updateUser = async () => {
    const model: UpdateUserModel = {
      id: Guid.raw(),
      updatedUserId: this.state.user.id,
      subjectId: this.state.user.subjectId,
      schoolName: this.state.user.schoolName,
      mobilePhone: this.state.user.phone,
      cityId: this.state.user.cityId,
      districtId: this.state.user.districtId,
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      email: this.state.user.email,
      maxAllowedDeviceCount: this.state.user.maxAllowedDeviceCount,
      maxAllowedStudentCount: this.state.user.maxAllowedStudentCount,
      canScan: this.state.user.canScan,
      licenseTypeId: this.state.user.licenseTypeId,
      expiryDateUtc: this.state.user.expiryDateUtc,
      active: this.state.user.active,
    };
    await createWebApiClient().post('/api/v1/users/update-by-admin', model);
    this.setState((prevState) => ({
      ...prevState,
      success: true,
      message: 'Basariyla Guncellendi',
      openUpdateUserDialog: false,
    }));
    this.setState({ user: await userService.getUser(this.props.match.params.userName) });
  };
}

export default withStyles(styles as any, { withTheme: true })(Component as any) as any;
