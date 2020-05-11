import React from 'react';
import { isEmpty, isUndefined, find } from 'testokur-utils';
import { connect } from 'react-redux';

import { City } from './types';
import AppState from '../AppState';
import { fetchCityRequest } from './actions';
import { withLoading, Select } from '../components';

interface CitySelectProps {
  cityId: number;
  districtId: number;
  onChange: (newCityId: number, newDistrictId: number) => void;
}

interface PropsFromState {
  cities: City[];
}

interface PropsFromDispatch {
  fetchCityRequest: typeof fetchCityRequest;
}

type Props = PropsFromState & PropsFromDispatch & CitySelectProps;

export class CitySelect extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchCityRequest();
  }
  public render = () => {
    return isEmpty(this.props.cities) || isUndefined(this.props.cityId) ? (
      <></>
    ) : (
      <div>
        <Select
          text="Sehir"
          id="city-select"
          value={this.props.cityId.toString()}
          onChange={(e) => this.props.onChange(e, 0)}
          items={this.props.cities}
        />
        <Select
          text="Ilce"
          id="district-select"
          value={this.props.districtId.toString()}
          onChange={(e) => this.props.onChange(this.props.cityId, e)}
          items={find(this.props.cities, (x) => x.id === this.props.cityId).districts}
        />
      </div>
    );
  };
}

const mapStateToProps = ({ cities }: AppState, ownProps: CitySelectProps) => ({
  loading: cities.loading,
  cities: cities.data,
  cityId: ownProps.cityId,
  districtId: ownProps.districtId,
  onChange: ownProps.onChange,
});

const mapDispatchToProps = {
  fetchCityRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(CitySelect));
