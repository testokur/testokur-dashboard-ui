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
  cityId: number;
  districtId: number;
}

interface PropsFromState {
  loading: boolean;
  cities: City[];
}

interface PropsFromDispatch {
  fetchCityRequest: typeof fetchCityRequest;
}
interface State {
  cityValue: number;
  districtValue: number;
}
type Props = PropsFromState & PropsFromDispatch & ComponentProps;

class Component extends React.Component<Props, State> {
  public componentDidMount() {
    if (_.isEmpty(this.props.cities)) {
      this.props.fetchCityRequest();
    }
  }
  public constructor(props: Props) {
    super(props);
    this.state = {
      cityValue: props.cityId,
      districtValue: props.districtId,
    };
  }
  public render = () => {
    return _.isEmpty(this.props.cities) ? (
      <></>
    ) : (
      <div>
        <FormControl fullWidth variant="outlined" className={this.props.classes.formControl}>
          <InputLabel htmlFor="city-select">Sehir</InputLabel>
          <Select
            value={this.state.cityValue}
            onChange={(e) => this.setState({ cityValue: e.target.value as number, districtValue: 0 })}
          >
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
            value={this.state.districtValue}
            onChange={(e) => this.setState({ districtValue: e.target.value as number })}
          >
            <MenuItem value={0}>
              <em>Seciniz</em>
            </MenuItem>
            {(_.find(this.props.cities, ['id', this.state.cityValue]) as City).districts.map((record) => (
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

// const component: React.FC<Props> = (props) => {
//   const [cityValue, setCityValue] = useState();
//   const [districtValue, setDistrictValue] = useState();
//   useEffect(() => {
//     if(_.isEmpty(props.cities)){
//       props.fetchCityRequest();
//     }
//     setCityValue(props.cityId);
//     setDistrictValue(props.districtId);
//   }, []);

//   return (
//     _.isEmpty(props.cities) ?  <></> :
//     <div>
//       <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
//         <InputLabel htmlFor="city-select">Sehir</InputLabel>
//         <Select value={cityValue} onChange={(e) => setCityValue(e.target.value)}>
//           <MenuItem value={0}>
//             <em>Seciniz</em>
//           </MenuItem>
//           {props.cities.map((record) => (
//             <MenuItem key={record.id} value={record.id}>
//               {record.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
//         <InputLabel htmlFor="district-select">Ilce</InputLabel>
//         <Select value={districtValue} onChange={(e) => setDistrictValue(e.target.value)}>
//           <MenuItem value={0}>
//             <em>Seciniz</em>
//           </MenuItem>
//           {(_.find(props.cities, ['id', cityValue]) as City).districts.map((record) => (
//               <MenuItem key={record.id} value={record.id}>
//                 {record.name}
//               </MenuItem>
//             ))
//           }
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

const mapStateToProps = ({ cities }: AppState, ownProps: ComponentProps) => ({
  loading: cities.loading,
  cities: cities.data,
  cityId: ownProps.cityId,
  districtId: ownProps.districtId,
});

const mapDispatchToProps = {
  fetchCityRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(Component as any) as any);
