import { Reducer } from 'redux';
import { CityState, FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS } from './types';

export const initialState: CityState = {
  loading: false,
  data: [],
};

const reducer: Reducer<CityState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_CITIES_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
