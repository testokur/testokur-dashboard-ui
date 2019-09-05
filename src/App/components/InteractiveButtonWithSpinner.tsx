import React from 'react';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

type Props = {
  classes?: any;
  loading: boolean;
};

export const styles = (theme: Theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const component = (props: Props) => {
  return (
    <div className={props.classes.wrapper}>
      <Button type="submit" fullWidth variant="contained" color="primary" disabled={props.loading}>
        Onayla
      </Button>
      {props.loading && <CircularProgress size={24} className={props.classes.buttonProgress} />}
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any);
