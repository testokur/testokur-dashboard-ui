import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

interface Props {
  loading: boolean;
}

const LoadingSpinner: React.FC<{}> = () => {
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
      return loading ? <LoadingSpinner /> : <Component {...(props as P)} />;
    }
  };
