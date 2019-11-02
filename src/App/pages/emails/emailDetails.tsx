import React from 'react';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { formatDateTime } from '../../helpers';
import { Typography, Divider } from '@material-ui/core';
import { FormTextbox } from '../../components';

interface Props {
  classes: any;
  location: any;
}

const emailDetails = (props: Props) => {
  return (
    <div>
      <FormTextbox label="Alici E-Posta" value={props.location.state.receiver} />
      <FormTextbox label="Gonderim Tarihi/Zamani" value={formatDateTime(new Date(props.location.state.sentOnUtc))} />
      <FormTextbox label="Baslik" value={props.location.state.subject} />
      <Divider />
      <Typography variant="h6">E-Posta</Typography>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: props.location.state.body }} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(emailDetails as any) as any;
