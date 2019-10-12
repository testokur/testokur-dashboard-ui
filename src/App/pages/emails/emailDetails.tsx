import React from 'react';
import { styles } from './styles';
import { withStyles } from '@material-ui/styles';

interface Props {
  classes: any;
}

const component = (props: Props) => {
  return <div />;
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
