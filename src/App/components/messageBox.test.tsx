import React from 'react';
import { mount } from 'enzyme';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import { messageBox as MessageBox } from './messageBox';

test('messagebox should not render when it is closed', () => {
  const wrapper = mount(<MessageBox variant="error" message="random message" />);
  expect(wrapper.find(SnackbarContent)).toHaveLength(1);
  wrapper.find(IconButton).simulate('click');
  expect(wrapper.find(SnackbarContent)).toHaveLength(0);
});
