import React from 'react';
import { withPhoneMask } from './withPhoneMask';
import { TextField } from '@material-ui/core';
import { mount } from 'enzyme';
import MaskedInput from 'react-text-mask';

const PhoneField = withPhoneMask(TextField);

test('phone mask should be applied', () => {
  const wrapper = mount(
    <PhoneField
      label="Telefon"
      style={{ margin: 8 }}
      placeholder="Phone"
      fullWidth
      margin="normal"
      variant="outlined"
    />,
  );
  expect(wrapper.find(MaskedInput)).toHaveLength(1);
});
