import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { DefaultTransition } from '../../../components';

interface Props {
  open: boolean;
  onClose(): void;
  onSubmit(amount: number): void;
}

export const AddSmsDialog = (props: Props) => {
  const [amount, setAmount] = useState();
  return (
    <Dialog open={props.open} TransitionComponent={DefaultTransition} onClose={props.onClose}>
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
            props.onSubmit(parseInt(amount, 10));
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
