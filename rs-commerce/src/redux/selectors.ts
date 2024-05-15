import { RootState } from './configure-store';

export const loginFormSelector = (state: RootState) => state.loginForm;
export const apiAuthSelector = (state: RootState) => state.apiAuth;
export const serviceMessageSelector = (state: RootState) => state.serviceMessage;
