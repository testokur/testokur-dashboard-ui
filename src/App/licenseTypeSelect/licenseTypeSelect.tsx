import React, { useEffect } from 'react';
import { isNil } from 'testokur-utils';
import { connect } from 'react-redux';
import { LicenseTypeModel } from './types';
import { fetchLicenseTypes } from './actions';
import AppState from '../AppState';
import { withLoading } from '../components';
import { SelectItem, Select } from 'testokur-ui';

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
      placeholder="Lisans Turu/Paket"
      value={isNil(props.id) ? '' : props.id.toString()}
      items={props.licenseTypes.map((c) => new SelectItem(c.id, c.name))}
      onChange={(e) => props.onChange(parseInt(e.currentTarget.value, 10))}
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

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(licenseTypeSelect));
