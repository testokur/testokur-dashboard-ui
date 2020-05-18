import React, { useState } from 'react';
import { isUndefined } from 'testokur-utils';
import { webApiClient } from '../../../modules';
import { ConfirmationDialog, withLoading } from '../../components';
import { CheckBox } from 'testokur-ui';

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
    if (isUndefined(props.activationTimeUtc) && !props.active) {
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
      <CheckBox checked={props.active} onChange={onSwitchClick} label="Lisans Durumu" />
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
