import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from './PrivateRoute';
import { MemoryRouter } from 'react-router';
import { Loading, createTheme } from 'testokur-ui';
import { ThemeProvider } from 'styled-components';

test('should render only spinner when user is not logged in', () => {
  const wrapper = mount(
    <ThemeProvider theme={createTheme()}>
  <PrivateRoute component={undefined} requiresAuthentication={true} location={undefined} />
  </ThemeProvider>);
  expect(wrapper.find(Loading)).toHaveLength(1);
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
  expect(wrapper.find(Loading)).toHaveLength(0);
  expect(wrapper.find(dummyComponent)).toHaveLength(1);
});
