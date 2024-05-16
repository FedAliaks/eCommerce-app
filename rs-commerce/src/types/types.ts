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

export type UserData = {
  email: string | undefined;
  firstName: string | undefined;
  id: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
};

export type ApiAuthSliceState = {
  isLoadingAuth: boolean;
  isAuth: boolean;
  loginData: Nullable<LoginData>;
  isAuthError400: boolean;
  userData: Nullable<UserData>;
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
