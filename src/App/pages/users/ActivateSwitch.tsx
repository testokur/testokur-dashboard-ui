import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide, Dialog, DialogTitle, DialogContentText, DialogContent, Button, DialogActions } from '@material-ui/core';
import { webApi } from '../../helpers';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = 'Transition';

interface Props {
  active: boolean;
  email: string;
}

export const ActivateSwitch: React.FC<Props> = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const activate = async (event: any) => {
    event.preventDefault();
    setOpenDialog(false);
    await webApi.post(`/api/v1/users/activate?email=${props.email}`);
  };

  return (
    <div>
      <FormControlLabel
        value="start"
        control={<Switch color="primary" value={props.active} onClick={() => setOpenDialog(true)} />}
        label="Lisans Durumu"
        labelPlacement="start"
      />
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{'Lisans Aktivasyon'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {
              'Lisans aktiflestirilecektir ve kullaniciya SMS ve E-Posta bilgilendirme mesajlari gonderilecektir. Onayliyor musunuz?'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hayir
          </Button>
          <Button onClick={activate} color="primary">
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
