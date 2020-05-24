import React from 'react';
import { isEmpty, isUndefined, find } from 'testokur-utils';
import { connect } from 'react-redux';

import { City } from './types';
import AppState from '../AppState';
import { fetchCityRequest } from './actions';
import { withLoading } from '../components';
import { Select, SelectItem, SpacingsAfter } from 'testokur-ui';

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
          spaceAfter={SpacingsAfter.Medium}
          placeholder="Sehir"
          value={this.props.cityId.toString()}
          items={this.props.cities.map((c) => new SelectItem(c.id, c.name))}
          onChange={(e) => this.props.onChange(parseInt(e.currentTarget.value, 10), 0)}
        />
        <Select
          spaceAfter={SpacingsAfter.Medium}
          placeholder="Ilce"
          value={this.props.districtId}
          onChange={(e) => this.props.onChange(this.props.cityId, parseInt(e.currentTarget.value, 10))}
          items={(find(this.props.cities, (x) => x.id === this.props.cityId)?.districts ?? []).map(
            (x) => new SelectItem(x.id, x.name),
          )}
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
