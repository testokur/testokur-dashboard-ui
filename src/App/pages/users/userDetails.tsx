import React from 'react';
import * as _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Grid, Avatar, withStyles, Divider, Tabs, Tab, Button, Paper, Box } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import { styles } from './styles';
import { UserStatus } from './UserStatus';
import { User } from '../home/types';
import AppState from '../../AppState';
import LicenseDetails from './LicenseDetails';
import { SmsDetails } from './smsDetails';
import PersonalDetails from './personalDetails';
import { ResetUserPassword } from './resetUserPassword';
import { ConfirmationDialog, MessageBox } from '../../components';
import { createWebApiClient } from '../../helpers';
import { UpdateUserModel } from './types';
import { Guid } from 'guid-typescript';
import { fetchUsers } from '../home/actions';

interface MatchParams {
  userName: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams> {
  classes: any;
}

interface PropsFromState {
  user: User;
  fetchUsers: typeof fetchUsers;
}
interface State {
  tabIndex: number;
  openUpdateUserDialog: boolean;
  user: User;
  success: boolean;
  message: string;
}

type Props = PropsFromState & ComponentProps;

class Component extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      tabIndex: 0,
      openUpdateUserDialog: false,
      user: this.props.user,
      success: false,
      message: '',
    };
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
            <Tab label="LISANS BILGILERI" />
            <Tab label="KISISEL BILGILER" />
            <Tab label="DIGER BILGILER" />
            <Tab label="PAROLA DEGISTIR" />
          </Tabs>
          {this.state.tabIndex === 0 && <LicenseDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 1 && <PersonalDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 2 && <SmsDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 3 && <ResetUserPassword user={this.state.user} />}
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

    if (newUser.smsBalance !== this.state.user.smsBalance) {
      reFetchUsers = true;
    }

    this.setState((prevState) => ({
      ...prevState,
      user: { ...prevState.user, ...newUser },
    }));

    if (reFetchUsers) {
      await this.props.fetchUsers();
    }
  };

  private updateUser = async () => {
    const model: UpdateUserModel = {
      id: Guid.raw(),
      updatedUserId: this.props.user.id,
      subjectId: this.props.user.subjectId,
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
    await this.props.fetchUsers();
  };
}

const mapStateToProps = ({ users }: AppState, { match }: ComponentProps) => ({
  user: _.head(_.filter(users.data, { userName: match.params.userName })),
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(Component as any) as any);
