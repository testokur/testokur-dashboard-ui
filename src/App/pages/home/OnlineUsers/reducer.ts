import { Reducer } from 'redux';
import { OnlineUsersState, FETCH_ONLINE_USERS_REQUEST, FETCH_ONLINE_USERS_SUCCESS } from './types';

export const initialState: OnlineUsersState = {
  loading: false,
  data: [],
};

const reducer: Reducer<OnlineUsersState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONLINE_USERS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_ONLINE_USERS_SUCCESS: {
      return { ...state, loading: false, success: true, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
