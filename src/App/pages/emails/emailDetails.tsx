import React from 'react';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { formatDateTime } from '../../helpers';
import { Typography, Divider } from '@material-ui/core';

interface Props {
  classes: any;
  location: any;
}

const component = (props: Props) => {
  return (
    <div>
      <TextField
        label="Alici E-Posta"
        style={{ margin: 8 }}
        placeholder="Alici E-Posta"
        fullWidth
        value={props.location.state.receiver}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Gonderim Tarihi/Zamani"
        style={{ margin: 8 }}
        placeholder="Gonderim Tarihi/Zamani"
        fullWidth
        value={formatDateTime(new Date(props.location.state.sentOnUtc))}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Baslik"
        style={{ margin: 8 }}
        placeholder="Baslik"
        fullWidth
        value={props.location.state.subject}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <Divider />
      <Typography variant="h6">E-Posta</Typography>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: props.location.state.body }} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
