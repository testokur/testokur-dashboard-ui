import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { DefaultTransition } from '../../../components';
import { Checkbox } from 'testokur-ui';

interface Props {
  open: boolean;
  onClose(): void;
  onSubmit(amount: number, gift: boolean): void;
}

export const AddSmsDialog = (props: Props) => {
  const [amount, setAmount] = useState('0');
  const [gift, setGift] = useState(false);
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
        <Checkbox label="Hediye SMS" checked={gift} onChange={(e) => setGift(e.target.checked)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Kapat
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            props.onSubmit(parseInt(amount, 10), gift);
            setAmount('0');
          }}
          color="primary"
        >
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};
