import {
  EMAIL_FORM_TIPS,
  LOGIN_PAGE_TEXT,
  PASSWORD_FORM_TIPS,
  ROUTE_PATH,
} from 'constants/constants';
import { useEffect, useState } from 'react';
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
import style from './style.module.css';

function LoginPageForm(): JSX.Element {
  const [emailValue, setEmailValue] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailTips, setEmailTips] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordTips, setPasswordTips] = useState('');
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isCanSubmit, setIsCanSubmit] = useState(false);

  const checkIsEmailValid = (): void => {
    if (emailTouched) {
      if (checkIsValueEmpty(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailEmpty);
        setIsEmailValid(false);
      } else if (checkIsValueHasWhitespaces(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailWhitespaces);
        setIsEmailValid(false);
      } else if (!checkEmailHasAmpSymbol(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailAmpSymbol);
        setIsEmailValid(false);
      } else if (checkEmailHasLocalPart(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailLocalPart);
        setIsEmailValid(false);
      } else if (checkEmailLocalPartIsValid(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailLocalPartValid);
        setIsEmailValid(false);
      } else if (checkEmailHasDomain(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailDomain);
        setIsEmailValid(false);
      } else if (checkEmailDomainIsValid(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailDomainValid);
        setIsEmailValid(false);
      } else if (!checkEmailValid(emailValue)) {
        setEmailTips(EMAIL_FORM_TIPS.tipsEmailFormat);
        setIsEmailValid(false);
      } else {
        setEmailTips('');
        setIsEmailValid(true);
      }
    }
  };

  const checkIsPasswordValid = (): void => {
    if (passwordTouched) {
      if (checkIsValueEmpty(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordEmpty);
        setIsPasswordValid(false);
      } else if (checkIsValueHasWhitespaces(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordWhitespaces);
        setIsPasswordValid(false);
      } else if (!checkIsValueHasLowercase(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasLowercase);
        setIsPasswordValid(false);
      } else if (!checkIsValueHasUppercase(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasUppercase);
        setIsPasswordValid(false);
      } else if (!checkIsValueHasDigit(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasDigit);
        setIsPasswordValid(false);
      } else if (!checkIsValueHasSpecial(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasSpecial);
        setIsPasswordValid(false);
      } else if (!checkIsValueHasOnlyLatin(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordHasOnlyLatin);
        setIsPasswordValid(false);
      } else if (checkPasswordLength(passwordValue)) {
        setPasswordTips(PASSWORD_FORM_TIPS.tipsPasswordLength);
        setIsPasswordValid(false);
      } else {
        setPasswordTips('');
        setIsPasswordValid(true);
      }
    }
  };

  const checkCanSubmit = (): void => {
    if (isEmailValid && isPasswordValid) {
      setIsCanSubmit(true);
    } else {
      setIsCanSubmit(false);
    }
  };

  useEffect(() => {
    checkIsEmailValid();
    checkIsPasswordValid();
  }, [emailValue, passwordValue]);

  useEffect(() => {
    checkCanSubmit();
  }, [isEmailValid, isPasswordValid]);

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailTouched(true);
    setEmailValue(e.target.value);
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordTouched(true);
    setPasswordValue(e.target.value);
  };

  const openEye = (): void => {
    setIsOpenEye(!isOpenEye);
  };

  const handleBtnLogin = (): void => {
    if (isEmailValid && isPasswordValid) {
      console.log('handle login with data: ', { email: emailValue, password: passwordValue });
    }
  };

  const loginPageBtnStyle = (): string =>
    isCanSubmit
      ? `${style['login-page-btn']}`
      : `${style['login-page-btn']} ${style['btn-not-active']}`;

  const eyeStyle = (): string =>
    isOpenEye ? `${style['password__eye']} ${style['eye-open']}` : `${style['password__eye']}`;

  const passwordType = (): string => (isOpenEye ? 'text' : 'password');

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
      <div className={loginPageBtnStyle()} onClick={handleBtnLogin} role="presentation">
        {LOGIN_PAGE_TEXT.loginPageBtn}
      </div>
    </div>
  );
}

export default LoginPageForm;
