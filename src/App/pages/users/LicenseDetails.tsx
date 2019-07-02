import React from 'react';
import dateformat from 'dateformat';
import { User } from '../home/types';
import { TextField, withStyles, Switch, FormControlLabel } from '@material-ui/core';
import { ActivateSwitch } from './ActivateSwitch';
import { styles } from './LicenseDetails.styles';
import { LicenseTypeSelect } from '../../licenseType';

interface Props {
  user: User;
  classes: any;
}

const component: React.FC<Props> = (props) => {
  return (
    <form className={props.classes.container} noValidate>
      <ActivateSwitch active={props.user.active} email={props.user.email} />
      <TextField
        label="E-Posta"
        style={{ margin: 8 }}
        placeholder="E-Posta"
        fullWidth
        value={props.user.email}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Olusturulma Tarihi"
        style={{ margin: 8 }}
        placeholder="Olusturulma Tarihi"
        fullWidth
        value={dateformat(props.user.createdDateTimeUtc, 'dd.mm.yyyy HH:MM')}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <LicenseTypeSelect />
      <TextField
        label="Izin verilen PC Sayisi"
        style={{ margin: 8 }}
        placeholder="Izin verilen PC Sayisi"
        fullWidth
        type="number"
        value={props.user.maxAllowedDeviceCount}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Izin verilen Ogrenci Kayit Sayisi"
        style={{ margin: 8 }}
        placeholder="Izin verilen Ogrenci Kayit Sayisi"
        fullWidth
        type="number"
        value={props.user.maxAllowedStudentCount}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControlLabel control={<Switch color="primary" />} label="Tarama Yapabilir" labelPlacement="start" />
    </form>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
