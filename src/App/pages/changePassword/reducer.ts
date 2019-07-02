import { Reducer } from 'redux';
import { ChangePasswordState, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR } from './types';

export const initialState: ChangePasswordState = {
  loading: false,
  success: false,
  message: undefined,
};

const reducer: Reducer<ChangePasswordState> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST: {
      return { ...state, loading: true };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return { ...state, loading: false, success: true, message: 'Parola basariyla guncellendi' };
    }
    case CHANGE_PASSWORD_ERROR: {
      return { ...state, loading: false, success: false, message: action.payload.description };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
