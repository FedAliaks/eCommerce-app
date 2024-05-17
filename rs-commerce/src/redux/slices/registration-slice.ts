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
};

export const registrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    setDateOfBirth(state, action: PayloadAction<string>) {
      state.dateOfBirth = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setBillingCity(state, action: PayloadAction<string>) {
      state.billingCity = action.payload;
    },
    setShippingCity(state, action: PayloadAction<string>) {
      state.shippingCity = action.payload;
    },
    setBillingStreet(state, action: PayloadAction<string>) {
      state.billingStreet = action.payload;
    },
    setShippingStreet(state, action: PayloadAction<string>) {
      state.shippingStreet = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setBillingPostCode(state, action: PayloadAction<string>) {
      state.billingPostCode = action.payload;
    },
    setShippingPostCode(state, action: PayloadAction<string>) {
      state.shippingPostCode = action.payload;
    },
    setBillingCountry(state, action: PayloadAction<string>) {
      state.billingCountry = action.payload;
    },
    setShippingCountry(state, action: PayloadAction<string>) {
      state.shippingCountry = action.payload;
    },
  },
});

export const { reducer: registrationFormReducer, actions: registrationFormActions } =
  registrationFormSlice;
