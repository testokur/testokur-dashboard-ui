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

export const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & Props> {
    public render() {
      const { loading, ...props } = this.props;
      return (
        <Box width="100%">
          <Box className="loading-spinner" display={loading ? 'block' : 'none'}>
            <LoadingSpinner />
          </Box>
          <Box className="component" display={loading ? 'none' : 'block'}>
            <Component {...(props as P)} />
          </Box>
        </Box>
      );
    }
  };
