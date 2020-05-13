import React from 'react';
import { mount } from 'enzyme';
import InteractiveButtonWithSpinner from './InteractiveButtonWithSpinner';
import { Button } from '@material-ui/core';
import { createTheme } from 'testokur-ui';
import { ThemeProvider } from 'styled-components';

test('spinner should be rendered and button should be disabled when loading', () => {
  const wrapper = mount(
    <ThemeProvider theme={createTheme()}>
      <InteractiveButtonWithSpinner loading={true} />
    </ThemeProvider>,
  );
  expect(wrapper.find('div[type="ButtonLoader"]').length).toBeGreaterThanOrEqual(1);
  expect(
    wrapper
      .find(Button)
      .first()
      .prop('disabled'),
  ).toBeTruthy();
});

test('spinner should not be rendered and button should not be disabled when not loading', () => {
  const wrapper = mount(
    <ThemeProvider theme={createTheme()}>
      <InteractiveButtonWithSpinner loading={false} />
    </ThemeProvider>,
  );
  expect(wrapper.find('div[type="ButtonLoader"]').length).toBe(0);
  expect(
    wrapper
      .find(Button)
      .first()
      .prop('disabled'),
  ).toBeFalsy();
});
