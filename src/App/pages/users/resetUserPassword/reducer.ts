import { Reducer } from 'redux';
import { RESET_PASSWORD_ADMIN_REQUEST, RESET_PASSWORD_ADMIN_ERROR, RESET_PASSWORD_ADMIN_SUCCESS } from './types';
import { ChangePasswordState } from '../../changePassword/types';

export const initialState: ChangePasswordState = {
  loading: false,
  success: false,
  message: undefined,
};

const reducer: Reducer<ChangePasswordState> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_ADMIN_REQUEST: {
      return { ...state, loading: true };
    }
    case RESET_PASSWORD_ADMIN_SUCCESS: {
      return { ...state, loading: false, success: true, message: 'Parola basariyla guncellendi' };
    }
    case RESET_PASSWORD_ADMIN_ERROR: {
      return { ...state, loading: false, success: false, message: action.payload.description };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
