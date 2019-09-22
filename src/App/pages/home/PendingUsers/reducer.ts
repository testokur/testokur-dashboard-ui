import { Reducer } from 'redux';
import { PendingUsersState, FETCH_PENDING_USERS_REQUEST, FETCH_PENDING_USERS_SUCCESS } from './types';

export const initialState: PendingUsersState = {
  loading: false,
  data: [],
};

const reducer: Reducer<PendingUsersState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PENDING_USERS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_PENDING_USERS_SUCCESS: {
      return { ...state, loading: false, success: true, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
