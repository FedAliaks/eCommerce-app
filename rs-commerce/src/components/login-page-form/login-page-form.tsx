import {
  EMAIL_FORM_TIPS,
  LOGIN_PAGE_TEXT,
  PASSWORD_FORM_TIPS,
  ROUTE_PATH,
} from 'constants/constants';
import { useEffect } from 'react';
import {
  checkEmailDomainIsValid,
  checkEmailHasAmpSymbol,
  checkEmailHasDomain,
  checkEmailHasLocalPart,
  checkEmailLocalPartIsValid,
  checkEmailValid,
  checkIsValueEmpty,
  checkIsValueHasDigit,
  checkIsValueHasLowercase,
  checkIsValueHasOnlyLatin,
  checkIsValueHasSpecial,
  checkIsValueHasUppercase,
  checkIsValueHasWhitespaces,
  checkPasswordLength,
} from 'utils/check-utils';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { loginFormSelector } from 'redux/selectors';
import { loginFormActions } from 'redux/slices/login-form-slice';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import ButtonBig from 'components/button-big/button-big';
import InputPassword from 'components/input-password/input-password';
import InputText from 'components/input-text/input-text';
import { LoginData } from 'types/types';
import CustomLink from 'components/custom-link/custom-link';
import style from './style.module.css';

function LoginPageForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    emailValue,
    emailTouched,
    isEmailValid,
    emailTips,
    passwordValue,
    passwordTouched,
    isPasswordValid,
    passwordTips,
    loginFormErrorMessage,
  } = useAppSelector(loginFormSelector);

  const checkIsEmailValid = (): void => {
    if (!emailTouched) return;

    if (checkIsValueEmpty(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailEmpty));
    } else if (checkIsValueHasWhitespaces(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailWhitespaces));
    } else if (!checkEmailHasAmpSymbol(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailAmpSymbol));
    } else if (checkEmailHasLocalPart(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailLocalPart));
    } else if (checkEmailLocalPartIsValid(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailLocalPartValid));
    } else if (checkEmailHasDomain(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailDomain));
    } else if (checkEmailDomainIsValid(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailDomainValid));
    } else if (!checkEmailValid(emailValue)) {
      dispatch(loginFormActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailFormat));
    } else {
      dispatch(loginFormActions.setEmailTips(''));
      dispatch(loginFormActions.setIsEmailValid(true));
      return;
    }

    dispatch(loginFormActions.setIsEmailValid(false));
  };

  const checkIsPasswordValid = (): void => {
    if (!passwordTouched) return;

    if (checkIsValueEmpty(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordEmpty));
    } else if (checkIsValueHasWhitespaces(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordWhitespaces));
    } else if (!checkIsValueHasLowercase(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasLowercase));
    } else if (!checkIsValueHasUppercase(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasUppercase));
    } else if (!checkIsValueHasDigit(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasDigit));
    } else if (!checkIsValueHasSpecial(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasSpecial));
    } else if (!checkIsValueHasOnlyLatin(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasOnlyLatin));
    } else if (!checkPasswordLength(passwordValue)) {
      dispatch(loginFormActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordLength));
    } else {
      dispatch(loginFormActions.setPasswordTips(''));
      dispatch(loginFormActions.setIsPasswordValid(true));
      return;
    }

    dispatch(loginFormActions.setIsPasswordValid(false));
  };

  useEffect(() => {
    checkIsEmailValid();
    checkIsPasswordValid();
  }, [emailValue, passwordValue]);

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(loginFormActions.setEmailTouched(true));
    dispatch(loginFormActions.setEmailValue(e.target.value));
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(loginFormActions.setPasswordTouched(true));
    dispatch(loginFormActions.setPasswordValue(e.target.value));
  };

  const handleBtnLogin = (): void => {
    if (isEmailValid && isPasswordValid) {
      const loginData: LoginData = { email: emailValue, password: passwordValue };
      dispatch(apiAuthActions.startAuth({ data: loginData }));
    }
  };

  const clearLoginFormErrorMessage = (): void => {
    dispatch(loginFormActions.setLoginFormErrorMessage(''));
  };

  const isActiveStyle = (): boolean => isEmailValid && isPasswordValid;

  return (
    <div className={style['login-page-form']}>
      <div className={style['login-page-form-title']}>{LOGIN_PAGE_TEXT.titleForm}</div>
      <div className={style['login-page-form-register']}>
        {LOGIN_PAGE_TEXT.linkRegistration}
        <CustomLink
          to={ROUTE_PATH.registration}
          elStyle="text-blue"
          text={LOGIN_PAGE_TEXT.linkTo}
        />
      </div>
      <InputText
        nameWrapper={LOGIN_PAGE_TEXT.titleEmail}
        nameId={LOGIN_PAGE_TEXT.idEmail}
        namePlaceholder={LOGIN_PAGE_TEXT.placeholderEmail}
        inputValue={emailValue}
        onChange={handleInputEmail}
        clearFunction={clearLoginFormErrorMessage}
        inputTips={emailTips}
      />
      <InputPassword
        nameWrapper={LOGIN_PAGE_TEXT.titlePassword}
        nameId={LOGIN_PAGE_TEXT.idPassword}
        namePlaceholder={LOGIN_PAGE_TEXT.placeholderPassword}
        inputValue={passwordValue}
        onChange={handleInputPassword}
        clearFunction={clearLoginFormErrorMessage}
        inputTips={passwordTips}
      />
      <div className={style['login-page-error']}>{loginFormErrorMessage}</div>
      <ButtonBig
        isActiveStyle={isActiveStyle()}
        content={LOGIN_PAGE_TEXT.loginPageBtn}
        onClick={handleBtnLogin}
      />
    </div>
  );
}

export default LoginPageForm;
