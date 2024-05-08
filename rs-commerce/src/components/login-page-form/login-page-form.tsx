import {
  EMAIL_FORM_TIPS,
  LOGIN_PAGE_TEXT,
  PASSWORD_FORM_TIPS,
  ROUTE_PATH,
} from 'constants/constants';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import authSelector from 'redux/selectors';
import { authActions } from 'redux/slices/auth-slice';
import ButtonBig from 'components/button-big/button-big';
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
    isOpenEye,
  } = useAppSelector(authSelector);

  const checkIsEmailValid = (): void => {
    if (!emailTouched) return;

    if (checkIsValueEmpty(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailEmpty));
    } else if (checkIsValueHasWhitespaces(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailWhitespaces));
    } else if (!checkEmailHasAmpSymbol(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailAmpSymbol));
    } else if (checkEmailHasLocalPart(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailLocalPart));
    } else if (checkEmailLocalPartIsValid(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailLocalPartValid));
    } else if (checkEmailHasDomain(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailDomain));
    } else if (checkEmailDomainIsValid(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailDomainValid));
    } else if (!checkEmailValid(emailValue)) {
      dispatch(authActions.setEmailTips(EMAIL_FORM_TIPS.tipsEmailFormat));
    } else {
      dispatch(authActions.setEmailTips(''));
      dispatch(authActions.setIsEmailValid(true));
      return;
    }

    dispatch(authActions.setIsEmailValid(false));
  };

  const checkIsPasswordValid = (): void => {
    if (!passwordTouched) return;

    if (checkIsValueEmpty(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordEmpty));
    } else if (checkIsValueHasWhitespaces(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordWhitespaces));
    } else if (!checkIsValueHasLowercase(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasLowercase));
    } else if (!checkIsValueHasUppercase(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasUppercase));
    } else if (!checkIsValueHasDigit(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasDigit));
    } else if (!checkIsValueHasSpecial(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasSpecial));
    } else if (!checkIsValueHasOnlyLatin(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasOnlyLatin));
    } else if (!checkPasswordLength(passwordValue)) {
      dispatch(authActions.setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordLength));
    } else {
      dispatch(authActions.setPasswordTips(''));
      dispatch(authActions.setIsPasswordValid(true));
      return;
    }

    dispatch(authActions.setIsPasswordValid(false));
  };

  useEffect(() => {
    checkIsEmailValid();
    checkIsPasswordValid();
  }, [emailValue, passwordValue]);

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authActions.setEmailTouched(true));
    dispatch(authActions.setEmailValue(e.target.value));
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(authActions.setPasswordTouched(true));
    dispatch(authActions.setPasswordValue(e.target.value));
  };

  const openEye = (): void => {
    dispatch(authActions.setIsOpenEye(!isOpenEye));
  };

  const handleBtnLogin = (): void => {
    if (isEmailValid && isPasswordValid) {
      console.log('handle login with data: ', { email: emailValue, password: passwordValue });
    }
  };

  const eyeStyle = (): string =>
    isOpenEye ? `${style['password__eye']} ${style['eye-open']}` : `${style['password__eye']}`;

  const passwordType = (): string => (isOpenEye ? 'text' : 'password');

  const isActiveStyle = (): boolean => isEmailValid && isPasswordValid;

  return (
    <div className={style['login-page-form']}>
      <div className={style['login-page-form-title']}>{LOGIN_PAGE_TEXT.titleForm}</div>
      <div className={style['login-page-form-register']}>
        {LOGIN_PAGE_TEXT.linkRegistration}
        <Link to={ROUTE_PATH.registration} className={style['text-blue']}>
          {LOGIN_PAGE_TEXT.linkTo}
        </Link>
      </div>
      <div className={style['input-wrapper']}>
        <div className={style['input-field-name']}>{LOGIN_PAGE_TEXT.titleEmail}</div>
        <input
          className={style['input-field']}
          id="login-email"
          placeholder={LOGIN_PAGE_TEXT.placeholderEmail}
          value={emailValue}
          onChange={handleInputEmail}
        />
        <div className={style['input-field-tips']}>{emailTips}</div>
      </div>
      <div className={style['input-wrapper']}>
        <div className={eyeStyle()} onClick={openEye} role="presentation" />
        <div className={style['input-field-name']}>{LOGIN_PAGE_TEXT.titlePassword}</div>
        <input
          className={style['input-field']}
          id="login-password"
          type={passwordType()}
          placeholder={LOGIN_PAGE_TEXT.placeholderPassword}
          value={passwordValue}
          onChange={handleInputPassword}
        />
        <div className={style['input-field-tips']}>{passwordTips}</div>
      </div>
      <ButtonBig
        isActiveStyle={isActiveStyle()}
        content={LOGIN_PAGE_TEXT.loginPageBtn}
        onClick={handleBtnLogin}
      />
    </div>
  );
}

export default LoginPageForm;
