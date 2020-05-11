import React, { useState, useEffect } from 'react';
import { isUndefined } from 'testokur-utils';
import { withStyles, Switch, FormControlLabel } from '@material-ui/core';
import { ActivateSwitch } from './ActivateSwitch';
import { styles } from './licenseDetails.styles';
import { LicenseTypeSelect } from '../../licenseTypeSelect';
import { formatDateTime, parseDateTime } from 'testokur-utils';
import { User } from './types';
import { CitySelect } from '../../city';
import { PhoneField, FormTextbox } from '../../components';
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
      <FormTextbox
        label="E-Posta"
        value={props.user.email}
        onChange={(e) => props.onChange({ ...props.user, email: e.target.value })}
      />
      <FormTextbox label="Olusturulma Tarihi/Zamani" value={formatDateTime(props.user.createdDateTimeUtc)} />
      <FormTextbox
        label="Ilk Kullanim/Kullanima Acilma Tarihi/Zamani"
        value={formatDateTime(props.user.startDateTimeUtc)}
      />
      <FormTextbox
        label="Lisans Bitis/Son Kullanim Tarihi/Zamani"
        value={expiryDateTime}
        onChange={(e) => onExpiryDateChange(e.target.value)}
      />
      <LicenseTypeSelect
        id={props.user.licenseTypeId}
        onChange={(newValue) => props.onChange({ ...props.user, licenseTypeId: newValue })}
      />
      <FormTextbox
        label="Izin verilen PC Sayisi"
        value={props.user.maxAllowedDeviceCount}
        type="number"
        onChange={(e) => props.onChange({ ...props.user, maxAllowedDeviceCount: Number(e.target.value) })}
      />
      <FormTextbox
        label="Izin verilen Ogrenci Kayit Sayisi"
        value={props.user.maxAllowedStudentCount}
        type="number"
        onChange={(e) => props.onChange({ ...props.user, maxAllowedStudentCount: Number(e.target.value) })}
      />
      <FormTextbox
        label="Referans / Promosyon"
        value={props.user.referrer}
        onChange={(e) => props.onChange({ ...props.user, referrer: e.target.value })}
      />
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={isUndefined(props.user.canScan) ? false : props.user.canScan}
            value="canScan"
            onChange={(e) => props.onChange({ ...props.user, canScan: e.target.checked })}
          />
        }
        label="Tarama Yapabilir"
        labelPlacement="start"
      />
      <SmsDetails user={props.user} onChange={props.onChange} />
      <FormTextbox
        label="Isim"
        value={props.user.firstName}
        onChange={(e) => props.onChange({ ...props.user, firstName: e.target.value })}
      />
      <FormTextbox
        label="Soyisim"
        value={props.user.lastName}
        onChange={(e) => props.onChange({ ...props.user, lastName: e.target.value })}
      />
      <FormTextbox
        label="Kurum Adi"
        value={props.user.schoolName}
        onChange={(e) => props.onChange({ ...props.user, schoolName: e.target.value })}
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
      <FormTextbox
        label="Siparis Veren Ad-Soyad"
        value={props.user.registrarFullName}
        onChange={(e) => props.onChange({ ...props.user, registrarFullName: e.target.value })}
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
      <FormTextbox
        rows={5}
        label="Notlar/Yorumlar"
        multiline={true}
        value={props.user.notes}
        onChange={(e) => props.onChange({ ...props.user, notes: e.target.value })}
      />
    </form>
  );
};

export default withStyles(styles as any, { withTheme: true })(licenseDetails as any) as any;
