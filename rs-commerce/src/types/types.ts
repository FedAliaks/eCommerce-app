export type AuthSliceState = {
  emailValue: string;
  emailTouched: boolean;
  isEmailValid: boolean;
  emailTips: string;
  passwordValue: string;
  passwordTouched: boolean;
  isPasswordValid: boolean;
  passwordTips: string;
  isOpenEye: boolean;
};

export type ButtonBigProps = {
  style: string;
  content: string;
  onClick: () => void;
};
