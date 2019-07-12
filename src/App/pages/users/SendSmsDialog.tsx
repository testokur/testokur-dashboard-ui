import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Slide, TextField } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { MessageBox } from '../../components';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = 'Transition';

interface Props {
  open: boolean;
  phone: string;
  onClose(): void;
  onSubmit(phone: string, body: string): Promise<boolean>;
}

export const SendSmsDialog: React.FC<Props> = (props) => {
  const [body, setBody] = useState('');
  const [phone, setPhone] = useState(props.phone);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setPhone(props.phone);
  }, [props.phone]);

  return (
    <Dialog open={props.open} TransitionComponent={Transition} onClose={props.onClose}>
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
              value={'TESOKUR'}
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
              setSuccess(await props.onSubmit(phone, body));
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
