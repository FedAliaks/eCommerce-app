import { RootState } from './configure-store';

export const loginFormSelector = (state: RootState) => state.loginForm;
export const apiAuthSelector = (state: RootState) => state.apiAuth;
export const registrationFormSelector = (state: RootState) => state.registrationFrom;
export const apiRegistrationSelector = (state: RootState) => state.apiRegistration;
export const updateProfileSelector = (state: RootState) => state.updateProfile;
export const productDetailsSelector = (state: RootState) => state.productDetail;
export const apiCategoriesProductsSelector = (state: RootState) => state.apiCategoriesProducts;
export const cartSelector = (state: RootState) => state.cart;
