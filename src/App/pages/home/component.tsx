import React from 'react';
import { default as NewUsers } from './NewUsers';
import { OnlineUsers } from './OnlineUsers';

export const component = () => {
  return (
    <div>
      <NewUsers />
      <OnlineUsers />
    </div>
  );
};
