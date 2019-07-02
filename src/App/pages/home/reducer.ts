import { Reducer } from 'redux';
import { UsersState, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from './types';

export const initialState: UsersState = {
  loading: false,
  success: false,
  errorMessage: undefined,
  data: [],
};

const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_USERS_SUCCESS: {
      return { ...state, loading: false, success: true, data: action.payload };
    }
    case FETCH_USERS_ERROR: {
      return { ...state, loading: false, success: false, errorMessage: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
