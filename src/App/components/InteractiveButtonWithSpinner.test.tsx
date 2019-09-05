import React from 'react';
import { mount } from 'enzyme';
import { default as InteractiveButtonWithSpinner } from './InteractiveButtonWithSpinner';
import { CircularProgress, Button } from '@material-ui/core';

test('spinner should be rendered and button should be disabled when loading', () => {
  const wrapper = mount(<InteractiveButtonWithSpinner loading={true} />);
  expect(wrapper.find(CircularProgress)).toHaveLength(1);
  expect(
    wrapper
      .find(Button)
      .first()
      .prop('disabled'),
  ).toBeTruthy();
});

test('spinner should not be rendered and button should not be disabled when not loading', () => {
  const wrapper = mount(<InteractiveButtonWithSpinner loading={false} />);
  expect(wrapper.find(CircularProgress)).toHaveLength(0);
  expect(
    wrapper
      .find(Button)
      .first()
      .prop('disabled'),
  ).toBeFalsy();
});
