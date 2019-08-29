import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = 'Transition';

interface Props {
  open: boolean;
  message: string;
  title: string;
  onNoClick(): void;
  onYesClick(event?: any): void;
}

export const confirmationDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
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
