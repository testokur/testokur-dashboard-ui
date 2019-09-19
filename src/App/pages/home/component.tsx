import React from 'react';
import { default as NewUsers } from './NewUsers';
import { OnlineUsers } from './OnlineUsers';
import { Grid } from '@material-ui/core';

export const component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <NewUsers />
      </Grid>
      <Grid item xs={12} sm={6}>
        <OnlineUsers />
      </Grid>
    </Grid>
  );
};
