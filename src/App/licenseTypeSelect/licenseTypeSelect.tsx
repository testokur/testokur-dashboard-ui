import React, { useEffect } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { LicenseTypeModel } from './types';
import { fetchLicenseTypes } from './actions';
import AppState from '../AppState';
import { withLoading, Select } from '../components';

interface ComponentProps {
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

const licenseTypeSelect = (props: Props) => {
  useEffect(() => {
    props.fetchLicenseTypes();
  }, []);
  return (
    <Select
      text="Lisans Turu/Paket"
      id="license-type-select"
      value={_.isNil(props.id) ? '' : props.id.toString()}
      onChange={(e) => props.onChange(e)}
      items={props.licenseTypes}
    />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoading(licenseTypeSelect));
