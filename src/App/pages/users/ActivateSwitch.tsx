import React, { useState } from 'react';
import * as _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createWebApiClient } from '../../helpers';
import { ConfirmationDialog } from '../../components';

interface Props {
  active: boolean;
  expiryDateUtc?: Date;
  email: string;
  onActivated: () => void;
}

export const ActivateSwitch = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const activate = async (event: any) => {
    event.preventDefault();
    setOpenDialog(false);
    await createWebApiClient().post(`/api/v1/users/activate?email=${props.email}`);
    props.onActivated();
  };

  const onSwitchClick = async (event: any) => {
    if (!props.active && _.isNil(props.expiryDateUtc)) {
      setOpenDialog(true);
    } else {
      await activate(event);
    }
  };

  return (
    <div>
      <FormControlLabel
        value="start"
        control={<Switch color="primary" checked={props.active} onClick={onSwitchClick} />}
        label="Lisans Durumu"
        labelPlacement="start"
      />
      <ConfirmationDialog
        open={openDialog}
        title={'Lisans Aktivasyon'}
        message={
          'Lisans aktiflestirilecektir ve kullaniciya SMS ve E-Posta bilgilendirme mesajlari gonderilecektir. Onayliyor musunuz?'
        }
        onNoClick={() => setOpenDialog(false)}
        onYesClick={activate}
      />
    </div>
  );
};
