import React from 'react';
import { OnlineUsers } from './OnlineUsers';
import { PendingUsers } from './PendingUsers';
import { Grid } from '@material-ui/core';

export const component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <PendingUsers />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OnlineUsers />
      </Grid>
    </Grid>
  );
};
