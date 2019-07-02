import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Slide, TextField } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = 'Transition';

interface Props {
  open: boolean;
  onClose(): void;
  onSubmit(amount: number): void;
}

export const AddSmsDialog: React.FC<Props> = (props) => {
  const [amount, setAmount] = useState();
  return (
    <Dialog open={props.open} TransitionComponent={Transition} onClose={props.onClose}>
      <DialogContent>
        <TextField
          autoFocus
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          margin="dense"
          id="name"
          label="Kredi Miktari"
          type="number"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Kapat
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            props.onSubmit(amount);
            setAmount(0);
          }}
          color="primary"
        >
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};
