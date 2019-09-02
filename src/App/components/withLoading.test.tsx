import React from 'react';
import { mount } from 'enzyme';
import { withLoading } from './withLoading';

const dummyComponent = () => {
  return <div />;
};
test('when loading is set true then loader should be rendered', () => {
  const WithLoader = withLoading(dummyComponent);
  const wrapper = mount(<WithLoader loading={true} />);

  expect(
    wrapper
      .find('.loading-spinner')
      .first()
      .prop('display'),
  ).toBe('block');
  expect(
    wrapper
      .find('.component')
      .first()
      .prop('display'),
  ).toBe('none');
});

test('when loading is set false then component should be rendered', () => {
  const WithLoader = withLoading(dummyComponent);
  const wrapper = mount(<WithLoader loading={false} />);
  expect(
    wrapper
      .find('.loading-spinner')
      .first()
      .prop('display'),
  ).toBe('none');
  expect(
    wrapper
      .find('.component')
      .first()
      .prop('display'),
  ).toBe('block');
});
