import React from 'react';
import * as _ from 'lodash';
import { User } from '../home/types';
import { TextField, withStyles, Switch, FormControlLabel } from '@material-ui/core';
import { ActivateSwitch } from './ActivateSwitch';
import { styles } from './LicenseDetails.styles';
import { LicenseTypeSelect } from '../../licenseType';
import { formatDateTime } from '../../helpers';

interface Props {
  user: User;
  classes: any;
  onActivated: () => void;
  onChange: (user: User) => void;
}

const component = (props: Props) => {
  const displayDateTime = (d: Date | undefined) => {
    return _.isUndefined(d) ? '-' : formatDateTime(d);
  };
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
        label="Olusturulma Tarihi/Zamani"
        style={{ margin: 8 }}
        placeholder="Olusturulma Tarihi"
        fullWidth
        value={displayDateTime(props.user.createdDateTimeUtc)}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Ilk Kullanim/Kullanima Acilma Tarihi/Zamani"
        style={{ margin: 8 }}
        placeholder="Ilk Kullanim/Kullanima Acilma Tarihi/Zamani"
        fullWidth
        value={displayDateTime(props.user.startDateTimeUtc)}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Lisans Bitis/Son Kullanim Tarihi/Zamani"
        style={{ margin: 8 }}
        placeholder="Lisans Bitis/Son Kullanim Tarihi/Zamani"
        fullWidth
        value={displayDateTime(props.user.expiryDateUtc)}
        onChange={(e) => props.onChange({ ...props.user, expiryDateUtc: new Date(e.target.value) })}
        margin="normal"
        variant="outlined"
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
