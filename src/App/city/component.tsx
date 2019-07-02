import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { FormControl, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { City } from './types';
import AppState from '../AppState';
import { fetchCityRequest } from './actions';
import { styles } from './styles';

interface ComponentProps {
  classes?: any;
}

interface PropsFromState {
  loading: boolean;
  cities: City[];
}

interface PropsFromDispatch {
  fetchCityRequest: typeof fetchCityRequest;
}

type Props = PropsFromState & PropsFromDispatch & ComponentProps;

const component: React.FC<Props> = (props) => {
  useEffect(() => {
    props.fetchCityRequest();
  }, []);
  const [cityValue, setCityValue] = useState();
  const [districtValue, setDistrictValue] = useState();

  return (
    <div>
      <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
        <InputLabel htmlFor="city-select">Sehir</InputLabel>
        <Select value={cityValue} onChange={(e) => setCityValue(e.target.value)}>
          <MenuItem value="">
            <em>Seciniz</em>
          </MenuItem>
          {props.cities.map((record) => (
            <MenuItem key={record.id} value={record.id}>
              {record.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
        <InputLabel htmlFor="district-select">Ilce</InputLabel>
        <Select value={districtValue} onChange={(e) => setDistrictValue(e.target.value)}>
          <MenuItem value="">
            <em>Seciniz</em>
          </MenuItem>
          {_.isNil(cityValue) ? (
            <></>
          ) : (
            (_.find(props.cities, { id: cityValue }) as City).districts.map((record) => (
              <MenuItem key={record.id} value={record.id}>
                {record.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = ({ cities }: AppState) => ({
  loading: cities.loading,
  cities: cities.data,
});

const mapDispatchToProps = {
  fetchCityRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(component as any) as any);
