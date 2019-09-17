import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { DefaultTransition } from '.';

interface Props {
  open: boolean;
  message: string;
  title: string;
  onNoClick(): void;
  onYesClick(event?: any): Promise<void>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

export const confirmationDialog = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      TransitionComponent={DefaultTransition}
      onClose={props.onNoClick}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onNoClick} color="primary">
          Hayir
        </Button>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={async (event) => {
              await setLoading(true);
              await props.onYesClick(event);
              await setLoading(false);
            }}
          >
            Evet
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </Dialog>
  );
};
