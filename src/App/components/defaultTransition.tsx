import React from 'react';
import { Slide, SlideProps } from '@material-ui/core';

const defaultTransition = React.forwardRef<unknown, SlideProps>((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

defaultTransition.displayName = 'defaultTransition';

export default defaultTransition;
