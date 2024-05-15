import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServiceMessageSliceState } from 'types/types';

const initialState: ServiceMessageSliceState = {
  authOk: false,
  authError400: false,
  loginFormErrorMessage: false,
};

export const serviceMessageSlice = createSlice({
  name: 'serviceMessage',
  initialState,
  reducers: {
    setAuthOk(state, action: PayloadAction<boolean>) {
      state.authOk = action.payload;
    },
    setAuthError400(state, action: PayloadAction<boolean>) {
      state.authError400 = action.payload;
    },
    resetServiceMessageSlice(state) {
      state.authOk = false;
      state.authError400 = false;
    },
    setLoginFormErrorMessage(state, action: PayloadAction<boolean>) {
      state.loginFormErrorMessage = action.payload;
    },
  },
});

export const { reducer: serviceMessageReducer, actions: serviceMessageActions } =
  serviceMessageSlice;
