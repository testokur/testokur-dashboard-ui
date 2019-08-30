import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { User } from '../../home/types';
import { default as SmsFieldWithButton } from './smsFieldWithButton';
import { AddSmsDialog } from './AddSmsDialog';
import { createWebApiClient } from '../../../helpers';

interface Props {
  classes: any;
  user: User;
  onChange: (user: User) => void;
}

const component: React.FC<Props> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCredit = async (amount: number) => {
    setDialogOpen(false);
    await createWebApiClient().post('/api/v1/sms/add-credits', { userId: props.user.id, amount: amount });
    props.onChange({ ...props.user, smsBalance: props.user.smsBalance + amount });
  };
  return (
    <div>
      <div>
        <SmsFieldWithButton credit={props.user.smsBalance} onClick={() => setDialogOpen(true)} />
        <AddSmsDialog open={dialogOpen} onSubmit={handleAddCredit} onClose={() => setDialogOpen(false)} />
      </div>
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
