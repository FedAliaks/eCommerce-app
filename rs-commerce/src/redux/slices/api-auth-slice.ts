import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiAuthSliceState, LoginData, Nullable } from 'types/types';

const initialState: ApiAuthSliceState = {
  isLoadingAuth: false,
  isAuth: false,
  loginData: null,
  isAuthError400: false,
  userData: null,
};

export const apiAuthSlice = createSlice({
  name: 'apiAuth',
  initialState,
  reducers: {
    startAuth(state, action: PayloadAction<{ data: LoginData }>) {
      state.loginData = action.payload.data;
      state.isLoadingAuth = true;
    },
    resetLoginData(state) {
      state.loginData = null;
    },
    setIsLoadingAuth(state, action: PayloadAction<boolean>) {
      state.isLoadingAuth = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setIsAuthError400(state, action: PayloadAction<boolean>) {
      state.isAuthError400 = action.payload;
    },
    setUserData(state, action: PayloadAction<Nullable<CustomerSignInResult>>) {
      if (action.payload) {
        const { email, firstName, id, lastName, middleName } = action.payload.customer;
        const newData = {
          email,
          firstName,
          id,
          lastName,
          middleName,
        };
        state.userData = newData;
      }
    },
    resetApiAuthSlice(state) {
      state.isLoadingAuth = false;
      state.isAuth = false;
      state.loginData = null;
      state.isAuthError400 = false;
      state.userData = null;
    },
  },
});

export const { reducer: apiAuthReducer, actions: apiAuthActions } = apiAuthSlice;
