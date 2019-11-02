import React from 'react';
import { TextField } from '@material-ui/core';

interface FormTextboxProps {
  label: string;
  value?: unknown;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  readonly: boolean;
  multiline: boolean;
  rows?: string | number;
}

export const FormTextbox = (props: FormTextboxProps) => {
  return (
    <TextField
      label={props.label}
      style={{ margin: 8 }}
      placeholder={props.label}
      fullWidth
      margin="normal"
      variant="outlined"
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      InputLabelProps={{
        shrink: true,
      }}
      multiline={props.multiline}
      rows={props.rows}
      InputProps={{
        readOnly: props.readonly,
      }}
    />
  );
};
FormTextbox.defaultProps = {
  readonly: false,
  multiline: false,
};
