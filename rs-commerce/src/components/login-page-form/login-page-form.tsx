import LOGIN_PAGE_TEXT from 'constants/constants';
import './login-page-form.css';
import { useState } from 'react';

export default function LoginPageForm(): JSX.Element {
  const [isCanSubmit, setIsCanSubmit] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const checkCanSubmit = () => {
    if (emailValue && passwordValue) {
      setIsCanSubmit(true);
    } else {
      setIsCanSubmit(false);
    }
  };

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value);
    checkCanSubmit();
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value);
    checkCanSubmit();
  };

  const handleBtnLogin = (): void => {};

  const loginPageBtnStyle = (): string => `login-page-btn ${isCanSubmit ? '' : 'btn-not-active'}`;

  return (
    <div className="login-page-form">
      <div className="login-page-form-title">{LOGIN_PAGE_TEXT.titleForm}</div>
      <div className="login-page-form-register">
        {LOGIN_PAGE_TEXT.linkRegistration}
        <a className="text-blue" href="#registration">
          {LOGIN_PAGE_TEXT.linkTo}
        </a>
      </div>
      <div className="input-wrapper">
        <div className="input-field-name">{LOGIN_PAGE_TEXT.titleEmail}</div>
        <input
          className="input-field"
          id="login-email"
          placeholder={LOGIN_PAGE_TEXT.placeholderEmail}
          value={emailValue}
          onChange={handleInputEmail}
        />
        <div className="input-field-hints">{LOGIN_PAGE_TEXT.tempHint}</div>
      </div>
      <div className="input-wrapper">
        <div className="input-field-name">{LOGIN_PAGE_TEXT.titlePassword}</div>
        <input
          className="input-field"
          id="login-password"
          type="password"
          placeholder={LOGIN_PAGE_TEXT.placeholderPassword}
          value={passwordValue}
          onChange={handleInputPassword}
        />
        <div className="input-field-hints">{LOGIN_PAGE_TEXT.tempHint}</div>
      </div>
      <div className={loginPageBtnStyle()} onClick={handleBtnLogin} role="presentation">
        {LOGIN_PAGE_TEXT.loginPageBtn}
      </div>
    </div>
  );
}
