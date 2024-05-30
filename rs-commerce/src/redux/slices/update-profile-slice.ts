import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegistrationFormSliceState } from 'types/registrationTypes';

const initialState: RegistrationFormSliceState = {
  dateOfBirth: '',
  firstName: '',
  lastName: '',
  billingCity: '',
  shippingCity: '',
  billingStreet: '',
  shippingStreet: '',
  email: '',
  password: '',
  billingPostCode: '',
  shippingPostCode: '',
  billingCountry: '',
  shippingCountry: '',
  sameAddressForShippingAndBilling: false,
  defaultBillingAddress: false,
  defaultShippingAddress: false,
};

export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    setNewPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const { reducer: updateProfileReducer, actions: updateProfileActions } = updateProfileSlice;
