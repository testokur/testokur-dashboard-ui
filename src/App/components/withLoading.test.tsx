import React from 'react';
import { mount } from 'enzyme';
import { withLoading } from './withLoading';
import { ThemeProvider } from 'styled-components';
import { createTheme } from 'testokur-ui';

const dummyComponent = () => {
  return <div />;
};
test('when loading is set true then loader should be rendered', () => {
  const WithLoader = withLoading(dummyComponent);
  const wrapper = mount(
    <ThemeProvider theme={createTheme()}>
     <WithLoader loading={true} />
  </ThemeProvider>);

  expect(wrapper.find('div[type="BoxLoader"]').length).toBeGreaterThanOrEqual(1);
});

test('when loading is set false then component should be rendered', () => {
  const WithLoader = withLoading(dummyComponent);
  const wrapper = mount(<WithLoader loading={false} />);
  expect(wrapper.find('div[type="BoxLoader"]').length).toBe(0);
});
