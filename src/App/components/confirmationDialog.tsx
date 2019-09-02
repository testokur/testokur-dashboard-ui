import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { DefaultTransition } from '.';

interface Props {
  open: boolean;
  message: string;
  title: string;
  onNoClick(): void;
  onYesClick(event?: any): void;
}

export const confirmationDialog = (props: Props) => {
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
        <Button
          onClick={(event) => {
            event.preventDefault();
            props.onYesClick(event);
          }}
          color="primary"
        >
          Evet
        </Button>
      </DialogActions>
    </Dialog>
  );
};
