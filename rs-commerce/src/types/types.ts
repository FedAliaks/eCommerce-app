import { CustomerSignInResult, MyCustomerDraft } from '@commercetools/platform-sdk';

export type LoginFormSliceState = {
  emailValue: string;
  emailTouched: boolean;
  isEmailValid: boolean;
  emailTips: string;
  passwordValue: string;
  passwordTouched: boolean;
  isPasswordValid: boolean;
  passwordTips: string;
  loginFormErrorMessage: string;
};

export type Nullable<T> = T | null;

export type ApiAuthSliceState = {
  isLoadingAuth: boolean;
  isAuth: boolean;
  loginData: Nullable<LoginData>;
  isAuthError400: boolean;
  userData: Nullable<CustomerSignInResult>;
};

export type ApiRegistrationSliceState = {
  isLoadingRegistration: boolean;
  registrationData: Nullable<MyCustomerDraft>;
  isRegistrationError400: boolean;
};

export type ButtonBigProps = {
  isActiveStyle: boolean;
  content: string;
  onClick: () => void;
};

export type InputProps = {
  nameWrapper: string;
  nameId: string;
  namePlaceholder: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputTips: string;
  clearFunction?: () => void;
};

export type LoginData = {
  email: string;
  password: string;
};

export type MessageProps = {
  isOk: boolean;
  content: string;
  closeElement: () => void;
};

export type CustomLinkProps = {
  to: string;
  elStyle: string;
  text: string;
};
