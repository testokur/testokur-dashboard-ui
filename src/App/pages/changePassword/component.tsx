import React from 'react';
import * as _ from 'lodash';
import { Typography, Grid } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { PasswordField, InteractiveButtonWithSpinner } from '../../components';
import { snakeToCamel } from '../../helpers';
import { requestChangePassword, resetChangePasswordState } from './actions';
import { connect } from 'react-redux';
import { MessageBox } from '../../components';
import AppState from '../../AppState';

interface ComponentProps {
  classes: any;
}

interface PropsFromState {
  loading: boolean;
  success: boolean;
  message?: string;
}

interface State {
  formData: any;
}

interface PropsFromDispatch {
  requestChangePassword: typeof requestChangePassword;
  resetChangePasswordState: typeof resetChangePasswordState;
}

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

class Component extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      formData: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
    };
  }
  public componentDidMount() {
    this.props.resetChangePasswordState();
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const { formData } = this.state;
      if (value !== formData.newPassword) {
        return false;
      }
      return true;
    });
  }
  public componentDidUpdate() {
    if (this.props.success && !_.isNil(this.props.message)) {
      if (this.state.formData.currentPassword !== '') {
        this.setState({
          formData: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          },
        });
      }
    }
  }

  public render() {
    const { formData } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography component="h1" variant="h5">
            Parola Degistir
          </Typography>
          <ValidatorForm onSubmit={this.handleSubmit}>
            {!this.props.success && !_.isNil(this.props.message) ? (
              <MessageBox variant="error" message={this.props.message} />
            ) : (
              <></>
            )}
            {this.props.success && !_.isNil(this.props.message) ? (
              <MessageBox variant="success" message={this.props.message} />
            ) : (
              <></>
            )}
            <PasswordField
              label="Mevcut Parola"
              onChange={this.handleChange}
              name="current-password"
              value={formData.currentPassword}
            />
            <PasswordField
              label="Yeni Parola"
              onChange={this.handleChange}
              name="new-password"
              value={formData.newPassword}
            />
            <PasswordField
              label="Yeni Parola Tekrar"
              onChange={this.handleChange}
              name="new-password-confirm"
              validators={['isPasswordMatch']}
              errorMessages={['Yeni parola tekrari ile ayni olmali']}
              value={formData.newPasswordConfirm}
            />
            <InteractiveButtonWithSpinner loading={this.props.loading} />
          </ValidatorForm>
        </Grid>
      </Grid>
    );
  }

  private handleChange = (event: any) => {
    const { formData } = this.state;
    formData[snakeToCamel(event.target.name)] = event.target.value;
    this.setState({ formData });
  };
  private handleSubmit = () => {
    this.props.requestChangePassword(this.state.formData.currentPassword, this.state.formData.newPassword);
  };
}

const mapStateToProps = ({ changePassword }: AppState) => ({
  loading: changePassword.loading,
  success: changePassword.success,
  message: changePassword.message,
});

const mapDispatchToProps = {
  requestChangePassword,
  resetChangePasswordState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component as any);
