import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { TextField, withStyles, Switch, FormControlLabel } from '@material-ui/core';
import { ActivateSwitch } from './ActivateSwitch';
import { styles } from './licenseDetails.styles';
import { LicenseTypeSelect } from '../../licenseTypeSelect';
import { formatDateTime, parseDateTime } from '../../helpers';
import { User } from './types';
import { CitySelect } from '../../city';
import { PhoneField } from '../../components';
import { SmsDetails } from './smsDetails';

interface Props {
  user: User;
  classes: any;
  onChange: (user: User) => void;
}

const licenseDetails = (props: Props) => {
  const [expiryDateTime, setExpiryDateTime] = useState(formatDateTime(props.user.expiryDateUtc));
  useEffect(() => {
    setExpiryDateTime(formatDateTime(props.user.expiryDateUtc));
  }, [props]);

  const onExpiryDateChange = (newValue: string) => {
    try {
      props.onChange({ ...props.user, expiryDateUtc: parseDateTime(newValue) });
    } catch {
      // Do nothing
    } finally {
      setExpiryDateTime(newValue);
    }
  };

  return (
    <form className={props.classes.container} noValidate>
      <ActivateSwitch
        active={props.user.active}
        email={props.user.email}
        activationTimeUtc={props.user.activationTimeUtc}
        onActivationStatusChange={(newValue: boolean) => props.onChange({ ...props.user, active: newValue })}
      />
      <TextField
        label="E-Posta"
        style={{ margin: 8 }}
        placeholder="E-Posta"
        fullWidth
        value={props.user.email}
        margin="normal"
        variant="outlined"
        onChange={(e) => props.onChange({ ...props.user, email: e.target.value as string })}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Olusturulma Tarihi/Zamani"
        style={{ margin: 8 }}
        placeholder="Olusturulma Tarihi"
        fullWidth
        value={formatDateTime(props.user.createdDateTimeUtc)}
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
        value={formatDateTime(props.user.startDateTimeUtc)}
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
        value={expiryDateTime}
        onChange={(e) => onExpiryDateChange(e.target.value)}
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
      <TextField
        label="Referans / Promosyon"
        style={{ margin: 8 }}
        placeholder="Referans / Promosyon"
        fullWidth
        value={props.user.referrer}
        margin="normal"
        variant="outlined"
        onChange={(e) => props.onChange({ ...props.user, referrer: e.target.value as string })}
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
      <SmsDetails user={props.user} onChange={props.onChange} />
      <TextField
        label="Isim"
        style={{ margin: 8 }}
        placeholder="Isim"
        fullWidth
        value={props.user.firstName}
        onChange={(e) => props.onChange({ ...props.user, firstName: e.target.value })}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Soyisim"
        style={{ margin: 8 }}
        placeholder="Soyisim"
        fullWidth
        value={props.user.lastName}
        onChange={(e) => props.onChange({ ...props.user, lastName: e.target.value })}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Kurum Adi"
        style={{ margin: 8 }}
        placeholder="Kurum Adi"
        fullWidth
        value={props.user.schoolName}
        onChange={(e) => props.onChange({ ...props.user, schoolName: e.target.value })}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <PhoneField
        label="Telefon"
        style={{ margin: 8 }}
        placeholder="Telefon"
        fullWidth
        onChange={(e) => props.onChange({ ...props.user, phone: e.target.value.replace(/[-)()]/g, '') })}
        value={props.user.phone}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <CitySelect
        cityId={props.user.cityId}
        districtId={props.user.districtId}
        onChange={(newCityId, newDistrictId) =>
          props.onChange({ ...props.user, cityId: newCityId, districtId: newDistrictId })
        }
      />
      <TextField
        label="Siparis Veren Ad-Soyad"
        style={{ margin: 8 }}
        placeholder="Siparis Veren Ad-Soyad"
        fullWidth
        onChange={(e) => props.onChange({ ...props.user, registrarFullName: e.target.value })}
        value={props.user.registrarFullName}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <PhoneField
        label="Siparis Veren Telefon"
        style={{ margin: 8 }}
        placeholder="Siparis Veren Telefon"
        fullWidth
        value={props.user.registrarPhone}
        onChange={(e) => props.onChange({ ...props.user, registrarPhone: e.target.value.replace(/[-)()]/g, '') })}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Notlar/Yorumlar"
        style={{ margin: 8 }}
        placeholder="Notlar/Yorumlar"
        fullWidth
        multiline
        rows="5"
        value={props.user.notes}
        onChange={(e) => props.onChange({ ...props.user, notes: e.target.value })}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};

export default withStyles(styles as any, { withTheme: true })(licenseDetails as any) as any;
