import React, { useEffect } from 'react';
import * as _ from 'lodash';
import { FormControl, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { LicenseTypeModel } from './types';
import { fetchLicenseTypes } from './actions';
import AppState from '../AppState';
import { styles } from './styles';
import { withLoading } from '../components';

interface ComponentProps {
  classes?: any;
  id: number;
  onChange: (newValue: number) => void;
}

interface PropsFromState {
  licenseTypes: LicenseTypeModel[];
}

interface PropsFromDispatch {
  fetchLicenseTypes: typeof fetchLicenseTypes;
}

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

const component: React.FC<Props> = (props) => {
  useEffect(() => {
    if (_.isEmpty(props.licenseTypes)) {
      props.fetchLicenseTypes();
    }
  }, []);

  return (
    <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
      <InputLabel htmlFor="license-type-select">Lisan Turu/Paket</InputLabel>
      <Select value={props.id} onChange={(e) => props.onChange(e.target.value as number)}>
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

const mapStateToProps = ({ licenseTypes }: AppState, ownProps: ComponentProps) => ({
  loading: licenseTypes.loading,
  licenseTypes: licenseTypes.data,
  id: ownProps.id,
  onChange: ownProps.onChange,
});

const mapDispatchToProps = {
  fetchLicenseTypes,
};

const styled = withStyles(styles as any, { withTheme: true })(withLoading(component) as any);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styled);
