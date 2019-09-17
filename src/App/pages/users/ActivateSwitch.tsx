import React, { useState } from 'react';
import * as _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createWebApiClient } from '../../helpers';
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
    await createWebApiClient().post(`/api/v1/users/activate?email=${props.email}`);
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

  const component = (innerProps: { loading: boolean }) => (
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
  const Component = withLoading(component);

  return <Component loading={loading} />;
};
