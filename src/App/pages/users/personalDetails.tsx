import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { User } from '../home/types';
import { CitySelect } from '../../city';

interface Props {
  classes: any;
  user: User;
}

const component: React.FC<Props> = (props) => {
  return (
    <div>
      <TextField
        label="Isim"
        style={{ margin: 8 }}
        placeholder="Isim"
        fullWidth
        value={props.user.firstName}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Soyisim"
        style={{ margin: 8 }}
        placeholder="Soyisim"
        fullWidth
        value={props.user.lastName}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Kurum Adi"
        style={{ margin: 8 }}
        placeholder="Kurum Adi"
        fullWidth
        value={props.user.schoolName}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Telefon"
        style={{ margin: 8 }}
        placeholder="Telefon"
        fullWidth
        value={props.user.phone}
        margin="normal"
        variant="outlined"
      />
      <CitySelect cityId={props.user.cityId} districtId={props.user.districtId} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
