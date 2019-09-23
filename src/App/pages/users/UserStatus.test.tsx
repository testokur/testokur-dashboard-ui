import React from 'react';
import { shallow } from 'enzyme';
import { UserStatus } from './UserStatus';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Chip } from '@material-ui/core';
import HourglassFull from '@material-ui/icons/HourglassFull';
import AccessTime from '@material-ui/icons/AccessTime';
import Cancel from '@material-ui/icons/Cancel';
import { UserStatuses } from './types';

test('When status is active then check icon with "active" text should be displayed', () => {
  const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  const wrapper = shallow(<UserStatus active={true} expirationDate={expirationDate} />);
  expect(wrapper.find(Chip).props().label).toBe(UserStatuses.Active);
  expect(wrapper.find(Chip).props().icon).toMatchObject(<CheckCircleOutlineIcon />);
});

test('When status is expired then expired icon and text should be displayed', () => {
  const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const wrapper = shallow(<UserStatus active={true} expirationDate={expirationDate} />);
  expect(wrapper.find(Chip).props().label).toBe(UserStatuses.Expired);
  expect(wrapper.find(Chip).props().icon).toMatchObject(<HourglassFull />);
});

test('When status is pending then pending icon and text should be displayed', () => {
  const wrapper = shallow(<UserStatus active={false} expirationDate={undefined} />);
  expect(wrapper.find(Chip).props().label).toBe(UserStatuses.PendingForActivation);
  expect(wrapper.find(Chip).props().icon).toMatchObject(<AccessTime />);
});

test('When status is cancelled then cancelled icon and text should be displayed', () => {
  const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  const wrapper = shallow(<UserStatus active={false} expirationDate={expirationDate} />);
  expect(wrapper.find(Chip).props().label).toBe(UserStatuses.Deactivated);
  expect(wrapper.find(Chip).props().icon).toMatchObject(<Cancel />);
});
