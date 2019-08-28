import React from 'react';
import * as _ from 'lodash';
import { CircularProgress, Button, Grid, withStyles } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { PasswordField, MessageBox } from '../../../components';
import { snakeToCamel } from '../../../helpers';
import { connect } from 'react-redux';
import { User } from '../../home/types';
import AppState from '../../../AppState';
import { styles } from './styles';
import { requestResetPassword } from './actions';

interface ComponentProps {
  classes?: any;
  user: User;
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
  requestResetPassword: typeof requestResetPassword;
}

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

class Component extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      formData: {
        newPassword: '',
        newPasswordConfirm: '',
      },
    };
  }
  public componentDidMount() {
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
      if (this.state.formData.newPassword !== '') {
        this.setState({
          formData: {
            newPassword: '',
            newPasswordConfirm: '',
          },
        });
      }
    }
  }

  private handleChange = (event: any) => {
    const { formData } = this.state;
    formData[snakeToCamel(event.target.name)] = event.target.value;
    this.setState({ formData });
  };
  private handleSubmit = () => {
    this.props.requestResetPassword(this.props.user.id, this.state.formData.newPassword);
  };

  public render() {
    const { formData } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
            <div className={this.props.classes.wrapper}>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={this.props.loading}>
                Onayla
              </Button>
              {this.props.loading && <CircularProgress size={24} className={this.props.classes.buttonProgress} />}
            </div>
          </ValidatorForm>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ resetUserPassword }: AppState, ownProps: ComponentProps) {
  return {
    user: ownProps.user,
    loading: resetUserPassword.loading,
    success: resetUserPassword.success,
    message: resetUserPassword.message,
  };
}

const mapDispatchToProps = {
  requestResetPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(Component as any) as any);
