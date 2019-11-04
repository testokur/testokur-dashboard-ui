import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { MessageBox, DefaultTransition } from '../../components';

interface Props {
  open: boolean;
  phone: string;
  initialBody: string;
  onClose(): void;
  onSubmit(body: string): Promise<boolean>;
}

export const SendSmsDialog = (props: Props) => {
  const [body, setBody] = useState('');
  const [phone, setPhone] = useState(props.phone);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setPhone(props.phone);
    setBody(props.initialBody);
  }, [props.phone]);

  return (
    <Dialog open={props.open} TransitionComponent={DefaultTransition} onClose={props.onClose}>
      <DialogContent>
        {success ? (
          <div>
            <MessageBox variant="success" message={'SMS Gonderildi'} hasCloseButton={false} />
          </div>
        ) : (
          <div>
            <TextField
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              margin="dense"
              id="phone"
              label="Telefon"
              multiline
              fullWidth
            />
            <TextField
              value={'TESTOKUR'}
              margin="dense"
              id="subject"
              label="Baslik"
              multiline
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              autoFocus
              value={body}
              onChange={(event) => setBody(event.target.value)}
              margin="dense"
              id="body"
              label="Mesaj"
              multiline
              fullWidth
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
            setSuccess(false);
            setBody('');
          }}
          color="primary"
        >
          Kapat
        </Button>
        {success ? (
          <div />
        ) : (
          <Button
            onClick={async (event) => {
              event.preventDefault();
              setSuccess(await props.onSubmit(body));
            }}
            color="primary"
          >
            Gonder
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
SendSmsDialog.defaultProps = {
  initialBody: '',
};
