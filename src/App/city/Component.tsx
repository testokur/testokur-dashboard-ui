import React from 'react';
import * as _ from 'lodash';
import { FormControl, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { City } from './types';
import AppState from '../AppState';
import { fetchCityRequest } from './actions';
import { styles } from './styles';
import { withLoading } from '../components';

interface ComponentProps {
  classes?: any;
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
        <FormControl fullWidth={true} variant="outlined" className={this.props.classes.formControl}>
          <InputLabel htmlFor="city-select">Sehir</InputLabel>
          <Select value={this.props.cityId} onChange={(e) => this.props.onChange(e.target.value as number, 0)}>
            <MenuItem value={0}>
              <em>Seciniz</em>
            </MenuItem>
            {this.props.cities.map((record) => (
              <MenuItem key={record.id} value={record.id}>
                {record.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" className={this.props.classes.formControl}>
          <InputLabel htmlFor="district-select">Ilce</InputLabel>
          <Select
            value={this.props.districtId}
            onChange={(e) => this.props.onChange(this.props.cityId, e.target.value as number)}
          >
            <MenuItem value={0}>
              <em>Seciniz</em>
            </MenuItem>
            {(_.find(this.props.cities, ['id', this.props.cityId]) as City).districts.map((record) => (
              <MenuItem key={record.id} value={record.id}>
                {record.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
)(withStyles(styles as any, { withTheme: true })(withLoading(Component) as any) as any);
