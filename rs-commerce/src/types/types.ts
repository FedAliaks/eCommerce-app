export type AuthSliceState = {
  emailValue: string;
  emailTouched: boolean;
  isEmailValid: boolean;
  emailTips: string;
  passwordValue: string;
  passwordTouched: boolean;
  isPasswordValid: boolean;
  passwordTips: string;
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
};
