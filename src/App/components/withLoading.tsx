/* eslint-disable react/display-name */
import React from 'react';
import { CircularProgress, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

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
    loadingSpinner: {
      top: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    loadingComponent: {},
  }),
);

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress color="primary" size={120} />
    </Box>
  );
};

export const withLoading = <P extends object>(Component: React.ComponentType<P>) => (props: P & Props) => {
  const { loading, ...componentProps } = props;
  const classes = useStyles();
  return (
    <Box className={classes.loadingOuterBox} style={loading ? { opacity: 0.6 } : {}}>
      <Box className={clsx(classes.loadingComponent, 'component')}>
        <Component {...(componentProps as P)} />
      </Box>
      <Box className={clsx(classes.loadingSpinner, 'loading-spinner')} display={loading ? 'block' : 'none'}>
        <LoadingSpinner />
      </Box>
    </Box>
  );
};
