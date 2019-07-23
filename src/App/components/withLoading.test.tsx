import React from 'react';
import { mount } from 'enzyme';
import { CircularProgress } from '@material-ui/core';
import { withLoading } from './withLoading';

const dummyComponent: React.FC<{}> = () => {
  return <div />;
};
test('when loading is set true then loader should be rendered', () => {
  const WithLoader = withLoading(dummyComponent);
  const wrapper = mount(<WithLoader loading={true} />);
  expect(wrapper.find(CircularProgress)).toHaveLength(1);
  expect(wrapper.find(dummyComponent)).toHaveLength(0);
});

test('when loading is set false then component should be rendered', () => {
  const WithLoader = withLoading(dummyComponent);
  const wrapper = mount(<WithLoader loading={false} />);
  expect(wrapper.find(CircularProgress)).toHaveLength(0);
  expect(wrapper.find(dummyComponent)).toHaveLength(1);
});
