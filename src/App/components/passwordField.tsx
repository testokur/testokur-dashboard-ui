import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

interface PasswordFieldProps {
  errorMessages?: any[] | string;
  validators?: any[];
  label: string;
  value: any;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

export const passwordField = (props: PasswordFieldProps) => {
  return (
    <TextValidator
      variant="outlined"
      margin="normal"
      label={props.label}
      type="password"
      autoComplete={props.name}
      fullWidth
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      required
      validators={props.validators}
      errorMessages={props.errorMessages}
    />
  );
};
