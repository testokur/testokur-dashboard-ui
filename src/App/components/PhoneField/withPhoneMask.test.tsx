import React from 'react';
import { mount } from 'enzyme';
import MaskedInput from 'react-text-mask';
import { PhoneField } from '..';

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
