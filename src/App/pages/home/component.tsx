import React from 'react';
import { default as NewUsers } from './NewUsers';
import { OnlineUsers } from './OnlineUsers';
import { Box } from '@material-ui/core';

export const component = () => {
  return (
    <div>
      <NewUsers />
      <Box mt={10}><OnlineUsers /></Box>
    </div>
  );
};
