import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import SmsFieldWithButton from './smsFieldWithButton';
import { AddSmsDialog } from './AddSmsDialog';
import { webApiClient } from '../../../../modules';
import { User } from '../types';

interface Props {
  classes: any;
  user: User;
  onChange: (user: User) => void;
}

const smsDetails = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCredit = async (amount: number, gift: boolean) => {
    setDialogOpen(false);
    await webApiClient.post('/api/v1/sms/add-credits', { userId: props.user.id, amount: amount, gift: gift });
    props.onChange({ ...props.user, smsBalance: props.user.smsBalance + amount });
  };
  return (
    <div style={{ width: '100%' }}>
      <SmsFieldWithButton credit={props.user.smsBalance} onClick={() => setDialogOpen(true)} />
      <AddSmsDialog open={dialogOpen} onSubmit={handleAddCredit} onClose={() => setDialogOpen(false)} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(smsDetails as any) as any;
