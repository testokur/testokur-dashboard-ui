import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { LicenseTypeModel } from './types';
import { fetchLicenseTypes } from './actions';
import AppState from '../AppState';
import { styles } from './styles';

interface ComponentProps {
  classes?: any;
}

interface PropsFromState {
  loading: boolean;
  licenseTypes: LicenseTypeModel[];
}

interface PropsFromDispatch {
  fetchLicenseTypes: typeof fetchLicenseTypes;
}

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

const component: React.FC<Props> = (props) => {
  useEffect(() => {
    props.fetchLicenseTypes();
  }, []);
  const [value, setValue] = useState();

  return (
    <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
      <InputLabel htmlFor="license-type-select">Lisan Turu/Paket</InputLabel>
      <Select value={value} onChange={(e) => setValue(e.target.value)}>
        <MenuItem value="">
          <em>Seciniz</em>
        </MenuItem>
        {props.licenseTypes.map((record) => (
          <MenuItem key={record.id} value={record.id}>
            {record.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = ({ licenseTypes }: AppState) => ({
  loading: licenseTypes.loading,
  licenseTypes: licenseTypes.data,
});

const mapDispatchToProps = {
  fetchLicenseTypes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(component as any) as any);
