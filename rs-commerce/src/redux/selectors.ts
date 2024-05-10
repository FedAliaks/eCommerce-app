import { RootState } from './configure-store';

const authSelector = (state: RootState) => state.auth;

export default authSelector;
