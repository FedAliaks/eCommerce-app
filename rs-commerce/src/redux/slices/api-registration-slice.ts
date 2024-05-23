import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiRegistrationSliceState } from 'types/types';

const initialState: ApiRegistrationSliceState = {
  isLoadingRegistration: false,
  registrationData: null,
  isRegistrationError400: false,
};

export const apiRegistrationSlice = createSlice({
  name: 'apiRegistration',
  initialState,
  reducers: {
    startRegistration(state, action: PayloadAction<{ data: MyCustomerDraft }>) {
      state.registrationData = action.payload.data;
      state.isLoadingRegistration = true;
    },
    setIsLoadingRegistration(state, action: PayloadAction<boolean>) {
      state.isLoadingRegistration = action.payload;
    },
    setIsRegistrationError400(state, action: PayloadAction<boolean>) {
      state.isRegistrationError400 = action.payload;
    },
    resetApiRegistrationSlice(state) {
      state.isLoadingRegistration = false;
      state.registrationData = null;
      state.isRegistrationError400 = false;
    },
  },
});

export const { reducer: apiRegistrationReducer, actions: apiRegistrationActions } =
  apiRegistrationSlice;
