import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { CitySelect } from '../../city';
import { PhoneField } from '../../components';
import { User } from './types';

interface Props {
  classes: any;
  user: User;
  onChange: (user: User) => void;
}

const component = (props: Props) => {
  return (
    <div>
      <TextField
        label="Isim"
        style={{ margin: 8 }}
        placeholder="Isim"
        fullWidth
        value={props.user.firstName}
        onChange={(e) => props.onChange({ ...props.user, firstName: e.target.value })}
        margin="normal"
        variant="outlined"
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
      />
      <CitySelect
        cityId={props.user.cityId}
        districtId={props.user.districtId}
        onChange={(newCityId, newDistrictId) =>
          props.onChange({ ...props.user, cityId: newCityId, districtId: newDistrictId })
        }
      />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
