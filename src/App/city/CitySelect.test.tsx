import React from 'react';
import { mount } from 'enzyme';
import { CitySelect } from './CitySelect';
import { fetchCityRequest } from './actions';
import { Select } from '@material-ui/core';

test('When there are no cities then component should not be rendered', () => {
  const wrapper = mount(
    <CitySelect cities={[]} cityId={34} districtId={504} onChange={jest.fn} fetchCityRequest={fetchCityRequest} />,
  );
  expect(wrapper.find(Select)).toHaveLength(0);
});
