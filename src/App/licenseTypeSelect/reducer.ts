import { Reducer } from 'redux';
import { LicenseTypeState, FETCH_LICENSETYPES_REQUEST, FETCH_LICENSETYPES_SUCCESS } from './types';

export const initialState: LicenseTypeState = {
  loading: false,
  data: [],
};

const reducer: Reducer<LicenseTypeState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LICENSETYPES_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_LICENSETYPES_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
