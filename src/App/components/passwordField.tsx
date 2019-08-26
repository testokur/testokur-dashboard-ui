import * as React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

interface Props {
  label: string;
  value: any;
  name: string;
  onChange?(e: React.FormEvent<{}>, newValue: string): void;
  errorMessages?: any[] | string;
  validators?: any[];
}

export const passwordField: React.FC<Props> = (props) => {
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
