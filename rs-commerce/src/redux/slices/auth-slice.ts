import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthSliceState } from 'types/types';

const initialState: AuthSliceState = {
  emailValue: '',
  emailTouched: false,
  isEmailValid: false,
  emailTips: '',
  passwordValue: '',
  passwordTouched: false,
  isPasswordValid: false,
  passwordTips: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmailValue(state, action: PayloadAction<string>) {
      state.emailValue = action.payload;
    },
    setEmailTouched(state, action: PayloadAction<boolean>) {
      state.emailTouched = action.payload;
    },
    setIsEmailValid(state, action: PayloadAction<boolean>) {
      state.isEmailValid = action.payload;
    },
    setEmailTips(state, action: PayloadAction<string>) {
      state.emailTips = action.payload;
    },
    setPasswordValue(state, action: PayloadAction<string>) {
      state.passwordValue = action.payload;
    },
    setPasswordTouched(state, action: PayloadAction<boolean>) {
      state.passwordTouched = action.payload;
    },
    setIsPasswordValid(state, action: PayloadAction<boolean>) {
      state.isPasswordValid = action.payload;
    },
    setPasswordTips(state, action: PayloadAction<string>) {
      state.passwordTips = action.payload;
    },
    resetSlice(state) {
      state.emailValue = '';
      state.emailTouched = false;
      state.isEmailValid = false;
      state.emailTips = '';
      state.passwordValue = '';
      state.passwordTouched = false;
      state.isPasswordValid = false;
      state.passwordTips = '';
    },
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
