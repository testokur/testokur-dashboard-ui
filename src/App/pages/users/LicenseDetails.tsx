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
  onActivated: () => void;
  onChange: (user: User) => void;
}

const component = (props: Props) => {
  return (
    <form className={props.classes.container} noValidate>
      <ActivateSwitch
        active={props.user.active}
        email={props.user.email}
        expiryDateUtc={props.user.expiryDateUtc}
        onActivated={props.onActivated}
      />
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
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <LicenseTypeSelect
        id={props.user.licenseTypeId}
        onChange={(newValue) => props.onChange({ ...props.user, licenseTypeId: newValue })}
      />
      <TextField
        label="Izin verilen PC Sayisi"
        style={{ margin: 8 }}
        placeholder="Izin verilen PC Sayisi"
        fullWidth
        type="number"
        value={props.user.maxAllowedDeviceCount}
        onChange={(e) =>
          props.onChange({ ...props.user, maxAllowedDeviceCount: (e.target.value as unknown) as number })
        }
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
        onChange={(e) =>
          props.onChange({ ...props.user, maxAllowedStudentCount: (e.target.value as unknown) as number })
        }
        value={props.user.maxAllowedStudentCount}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={props.user.canScan}
            onChange={(e) => props.onChange({ ...props.user, canScan: e.target.checked })}
          />
        }
        label="Tarama Yapabilir"
        labelPlacement="start"
      />
    </form>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
