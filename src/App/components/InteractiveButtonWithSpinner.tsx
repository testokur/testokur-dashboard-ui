import React from 'react';
import { Button, withStyles, Theme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Loading, LoadingTypes } from 'testokur-ui';

interface InteractiveButtonWithSpinnerProps {
  classes?: any;
  loading: boolean;
}

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

const interactiveButtonWithSpinner = (props: InteractiveButtonWithSpinnerProps) => {
  return (
    <div className={props.classes.wrapper}>
      <Button type="submit" fullWidth variant="contained" color="primary" disabled={props.loading}>
        Onayla
      </Button>
      <Loading loading={props.loading} type={LoadingTypes.ButtonLoader} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(interactiveButtonWithSpinner as any);
