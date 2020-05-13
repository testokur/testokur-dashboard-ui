/* eslint-disable react/display-name */
import React from 'react';
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Loading, LoadingTypes } from 'testokur-ui';

interface Props {
  loading: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingOuterBox: {
      display: 'block',
      position: 'relative',
      width: '100%',
    },
  }),
);

export const withLoading = <P extends object>(Component: React.ComponentType<P>) => (props: P & Props) => {
  const { loading, ...componentProps } = props;
  const classes = useStyles();
  return (
    <Box className={classes.loadingOuterBox}>
      <Box>
        <Component {...(componentProps as P)} />
      </Box>
      <Loading loading={loading} type={LoadingTypes.BoxLoader} text="Yukleniyor..." />
    </Box>
  );
};
