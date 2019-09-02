import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from './PrivateRoute';
import { CircularProgress } from '@material-ui/core';
import { MemoryRouter } from 'react-router';

test('should render only spinner when user is not logged in', () => {
  const wrapper = mount(<PrivateRoute component={undefined} requiresAuthentication={true} location={undefined} />);
  expect(wrapper.find(CircularProgress)).toHaveLength(1);
});

test('should render component when user is logged in', () => {
  const dummyComponent = () => {
    return <div />;
  };

  const wrapper = mount(
    <MemoryRouter>
      <PrivateRoute component={dummyComponent} requiresAuthentication={false} location={undefined} />{' '}
    </MemoryRouter>,
  );
  expect(wrapper.find(CircularProgress)).toHaveLength(0);
  expect(wrapper.find(dummyComponent)).toHaveLength(1);
});
