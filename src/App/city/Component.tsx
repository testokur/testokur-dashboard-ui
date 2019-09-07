import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { City } from './types';
import AppState from '../AppState';
import { fetchCityRequest } from './actions';
import { withLoading, Select } from '../components';

interface ComponentProps {
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

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

export class Component extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchCityRequest();
  }
  public render = () => {
    return _.isEmpty(this.props.cities) ? (
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
          items={(_.find(this.props.cities, ['id', this.props.cityId]) as City).districts}
        />
      </div>
    );
  };
}

const mapStateToProps = ({ cities }: AppState, ownProps: ComponentProps) => ({
  loading: cities.loading,
  cities: cities.data,
  cityId: ownProps.cityId,
  districtId: ownProps.districtId,
  onChange: ownProps.onChange,
});

const mapDispatchToProps = {
  fetchCityRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoading(Component));
