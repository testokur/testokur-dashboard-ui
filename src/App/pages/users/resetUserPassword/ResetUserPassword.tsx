import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Typography, Grid } from '@material-ui/core';
import { identityApiClient } from '../../../../modules';
import { MessageBox, InteractiveButtonWithSpinner, PasswordField } from '../../../components';
import { User } from '../types';

interface Props {
  user: User;
}

export const ResetUserPassword = (props: Props) => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const response = await identityApiClient.post('/api/v1/users/reset-user-password-by-admin', {
      subjectId: props.user.subjectId,
      newPassword: newPassword,
    });
    if (!response.ok) {
      setSuccess(false);
      setMessage(await response.text());
    } else {
      setSuccess(true);
      setMessage('Parolaniz Basariyla Degistirildi');
      setNewPassword('');
      setNewPasswordConfirm('');
    }
    setLoading(false);
  };
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== newPassword) {
        return false;
      }
      return true;
    });
  }, [newPassword]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Typography component="h1" variant="h5">
          Parola Degistir
        </Typography>
        <ValidatorForm onSubmit={handleSubmit}>
          {!success && !_.isEmpty(message) ? <MessageBox variant="error" message={message} /> : <></>}
          {success && !_.isEmpty(message) ? <MessageBox variant="success" message={message} /> : <></>}
          <PasswordField
            label="Yeni Parola"
            onChange={(e) => setNewPassword(e.target.value)}
            name="new-password"
            value={newPassword}
          />
          <PasswordField
            label="Yeni Parola Tekrar"
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            name="new-password-confirm"
            validators={['isPasswordMatch']}
            errorMessages={['Yeni parola tekrari ile ayni olmali']}
            value={newPasswordConfirm}
          />
          <InteractiveButtonWithSpinner loading={loading} />
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};
