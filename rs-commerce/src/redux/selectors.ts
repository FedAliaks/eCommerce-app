import { RootState } from './configure-store';

export const loginFormSelector = (state: RootState) => state.loginForm;
export const apiAuthSelector = (state: RootState) => state.apiAuth;
export const registrationFormSelector = (state: RootState) => state.registrationFrom;
export const apiRegistrationSelector = (state: RootState) => state.apiRegistration;
