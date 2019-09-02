/* eslint-disable react/display-name */
import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

interface Props {
  loading: boolean;
}

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress size={120} />
    </Box>
  );
};

export const withLoading = <P extends object>(Component: React.ComponentType<P>) => (props: P & Props) => {
  const { loading, ...componentProps } = props;
  return (
    <Box width="100%">
      <Box className="loading-spinner" display={loading ? 'block' : 'none'}>
        <LoadingSpinner />
      </Box>
      <Box className="component" display={loading ? 'none' : 'block'}>
        <Component {...(componentProps as P)} />
      </Box>
    </Box>
  );
};
