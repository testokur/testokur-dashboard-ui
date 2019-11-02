import React from 'react';
import * as _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Grid, Avatar, withStyles, Divider, Tabs, Tab, Fab } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { styles } from './styles';
import { UserStatus } from './UserStatus';
import LicenseDetails from './licenseDetails';
import { SmsDetails } from './smsDetails';
import { ResetUserPassword } from './resetUserPassword';
import { ConfirmationDialog, MessageBox } from '../../components';
import { createWebApiClient } from '../../helpers';
import { UpdateUserModel, User } from './types';
import { Guid } from 'guid-typescript';
import { UserActivityList } from './userActivityList';
import { userService } from './userService';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Sms from '@material-ui/icons/Sms';
import Save from '@material-ui/icons/Save';
import { SendSmsDialog } from './SendSmsDialog';

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
  smsDialogOpen: boolean;
  deleteUserDialogOpen: boolean;
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
      smsDialogOpen: false,
      deleteUserDialogOpen: false,
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
            <Tab label="SMS" />
            <Tab label="PAROLA" />
            <Tab label="LOG" />
          </Tabs>
          {this.state.tabIndex === 0 && <LicenseDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 1 && <SmsDetails user={this.state.user} onChange={this.handleChange} />}
          {this.state.tabIndex === 2 && <ResetUserPassword user={this.state.user} />}
          {this.state.tabIndex === 3 && <UserActivityList user={this.state.user} />}
        </div>
        {this.state.tabIndex !== 2 && (
          <div>
            <Fab
              color="primary"
              className={this.props.classes.fab}
              onClick={() => this.setUpdateUserDialogState(true)}
              aria-label="Degisiklikleri Kaydet"
            >
              <Save />
            </Fab>
            <Fab
              color="secondary"
              className={this.props.classes.fab}
              onClick={() => this.setDeleteUserDialogState(true)}
              aria-label="sil"
            >
              <DeleteForever />
            </Fab>
            <Fab
              color="primary"
              className={this.props.classes.fab}
              onClick={() => this.setsmsDialogOpenState(true)}
              aria-label="Sms Gonder"
            >
              <Sms />
            </Fab>
          </div>
        )}
        <ConfirmationDialog
          open={this.state.openUpdateUserDialog}
          title={'Guncelleme Onay'}
          message={'Yaptiginiz degisikliler kaydedilecektir. Onayliyor musunuz?'}
          onNoClick={() => this.setUpdateUserDialogState(false)}
          onYesClick={() => this.updateUser()}
        />
        <ConfirmationDialog
          open={this.state.deleteUserDialogOpen}
          onNoClick={() => this.setDeleteUserDialogState(false)}
          onYesClick={() => this.deleteUser()}
          title={'Kullanici Silme'}
          message={
            _.get(this.state.user, 'email', '') +
            ' e-posta adresine sahip kullaniciyi silmek istediginize emin misiniz?'
          }
        />
        <SendSmsDialog
          initialBody={`SAYIN ${this.state.user.registrarFullName}, ADINIZA KAYITLI TESTOKUR SİPARİŞ KAYDI BULUNMADIĞINDAN LİSANS KAYDINIZ ONAYLANMAMIŞTIR. WEB SİTEMİZDEN HEMEN SİPARİŞ OLUŞTURABİLİRSİNİZ. İLGİNİZE TEŞEKKÜR EDERİZ`}
          onSubmit={this.sendSms}
          open={this.state.smsDialogOpen}
          onClose={() => this.setsmsDialogOpenState(false)}
          phone={_.get(this.state.user, 'phone', '')}
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

  private setDeleteUserDialogState = (display: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      deleteUserDialogOpen: display,
    }));
  };

  private setsmsDialogOpenState = (display: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      smsDialogOpen: display,
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
      this.setState({ user: await userService.getUser(this.props.match.params.userName) });
    }
  };

  private sendSms = async (body: string): Promise<boolean> => {
    await createWebApiClient().post('/api/v1/sms/send-admin', {
      receiver: _.get(this.state.user, 'phone', ''),
      body: body,
    });
    return true;
  };
  private deleteUser = async () => {
    await createWebApiClient().delete(`/api/v1/users/${_.get(this.state.user, 'id', '')}`);
    this.props.history.goBack();
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
      notes: this.state.user.notes,
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
