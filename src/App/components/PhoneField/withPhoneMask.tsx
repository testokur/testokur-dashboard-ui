/* eslint-disable react/display-name */
import React from 'react';
import MaskedInput from 'react-text-mask';
import { TextFieldProps } from '@material-ui/core/TextField';

interface PhoneMaskProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const phoneMask = (props: PhoneMaskProps) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : undefined);
      }}
      mask={['(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export const withPhoneMask = (Component: React.ComponentType<TextFieldProps>) => (props: TextFieldProps) => {
  return (
    <Component
      {...props}
      InputProps={{
        inputComponent: phoneMask as any,
      }}
    />
  );
};
