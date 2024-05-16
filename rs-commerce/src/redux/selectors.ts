import { RootState } from './configure-store';

const loginFormSelector = (state: RootState) => state.loginForm;

export default loginFormSelector;
