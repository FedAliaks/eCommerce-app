export type LoginFormSliceState = {
  emailValue: string;
  emailTouched: boolean;
  isEmailValid: boolean;
  emailTips: string;
  passwordValue: string;
  passwordTouched: boolean;
  isPasswordValid: boolean;
  passwordTips: string;
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
  namePlaceholder: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputTips: string;
};

export type LoginData = {
  email: string;
  password: string;
};
