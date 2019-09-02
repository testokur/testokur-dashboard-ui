import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide } from '@material-ui/core';

const defaultTransition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

defaultTransition.displayName = 'defaultTransition';

export default defaultTransition;
