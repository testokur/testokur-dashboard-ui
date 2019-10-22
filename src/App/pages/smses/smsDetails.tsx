import React from 'react';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { formatDateTime } from '../../helpers';
import { SmsStatus } from './smsStatus';

interface Props {
  classes: any;
  location: any;
}

const component = (props: Props) => {
  return (
    <div>
      <SmsStatus status={props.location.state.status} />
      <TextField
        label="Lisans Sahibi"
        style={{ margin: 8 }}
        fullWidth
        value={props.location.state.userEmail}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Telefon"
        style={{ margin: 8 }}
        fullWidth
        value={props.location.state.phone}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Baslik"
        style={{ margin: 8 }}
        fullWidth
        value={props.location.state.subject}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Mesaj"
        style={{ margin: 8 }}
        fullWidth
        multiline
        rows="3"
        value={props.location.state.body}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Istek Tarihi/Zamani"
        style={{ margin: 8 }}
        fullWidth
        value={formatDateTime(new Date(props.location.state.createdOnDateTimeUtc))}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Iletim Tarihi/Zamani"
        style={{ margin: 8 }}
        fullWidth
        value={formatDateTime(new Date(props.location.state.responseDateTimeUtc))}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Kontor Degeri"
        style={{ margin: 8 }}
        fullWidth
        value={props.location.state.credit}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="SMS Sunucusuna(IstanbulSms) Giden Istek"
        style={{ margin: 8 }}
        fullWidth
        multiline
        rows="3"
        value={props.location.state.serviceRequest}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="SMS Sunucusundan(IstanbulSms) Gelen Cevap"
        style={{ margin: 8 }}
        fullWidth
        multiline
        rows="3"
        value={props.location.state.serviceResponse}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Hata Mesaji"
        style={{ margin: 8 }}
        fullWidth
        multiline
        rows="3"
        value={props.location.state.error}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Kullanici Dostu Hata Mesaji"
        style={{ margin: 8 }}
        fullWidth
        multiline
        rows="3"
        value={props.location.state.userFriendlyErrorMessage}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
