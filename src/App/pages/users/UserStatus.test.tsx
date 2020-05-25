import React from 'react';
import { shallow } from 'enzyme';
import UserStatus from './UserStatus';
import { UserStatuses } from './types';
import { Check, Expired, Time, Cancelled, Badge } from 'testokur-ui';

test('When status is active then check icon with "active" text should be displayed', () => {
  const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  const wrapper = shallow(<UserStatus active={true} expirationDate={expirationDate} />);
  expect(wrapper.find(Badge).props().ariaLabel).toBe(UserStatuses.Active);
  expect(wrapper.find(Badge).props().icon).toMatchObject(<Check />);
});

test('When status is expired then expired icon and text should be displayed', () => {
  const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const wrapper = shallow(<UserStatus active={true} expirationDate={expirationDate} />);
  expect(wrapper.find(Badge).props().ariaLabel).toBe(UserStatuses.Expired);
  expect(wrapper.find(Badge).props().icon).toMatchObject(<Expired />);
});

test('When status is pending then pending icon and text should be displayed', () => {
  const wrapper = shallow(<UserStatus active={false} expirationDate={undefined} />);
  expect(wrapper.find(Badge).props().ariaLabel).toBe(UserStatuses.PendingForActivation);
  expect(wrapper.find(Badge).props().icon).toMatchObject(<Time />);
});

test('When status is cancelled then cancelled icon and text should be displayed', () => {
  const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  const wrapper = shallow(<UserStatus active={false} expirationDate={expirationDate} />);
  expect(wrapper.find(Badge).props().ariaLabel).toBe(UserStatuses.Deactivated);
  expect(wrapper.find(Badge).props().icon).toMatchObject(<Cancelled />);
});
