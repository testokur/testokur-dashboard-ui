import React from 'react';
import { mount } from 'enzyme';
import { Select } from '.';
import SelectInput from '@material-ui/core/Select/SelectInput';

test('select should render default "Select" item', () => {
  const wrapper = mount(<Select id="dummy-select"  onChange={jest.fn()} />);
  expect(
    wrapper
      .find(SelectInput)
  ).toHaveLength(1);

  expect(
    wrapper
      .find(SelectInput)
      .first()
      .prop("value")
  ).toBe("0");
});
