import React, { useState } from 'react';
import * as _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { webApiClient } from '../../../modules';
import { ConfirmationDialog, withLoading } from '../../components';

interface Props {
  active: boolean;
  activationTimeUtc?: Date;
  email: string;
  onActivationStatusChange: (newValue: boolean) => void;
}

export const ActivateSwitch = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const activate = async () => {
    setOpenDialog(false);
    await webApiClient.post(`/api/v1/users/activate?email=${props.email}`);
    props.onActivationStatusChange(!props.active);
    setLoading(false);
  };
  const onSwitchClick = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (_.isUndefined(props.activationTimeUtc) && !props.active) {
      setOpenDialog(true);
      return;
    }

    if (!props.active) {
      await activate();
    }

    props.onActivationStatusChange(!props.active);
    setLoading(false);
  };

  const activateSwitch = (innerProps: { loading: boolean }) => (
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
  const Component = withLoading(activateSwitch);

  return <Component loading={loading} />;
};
