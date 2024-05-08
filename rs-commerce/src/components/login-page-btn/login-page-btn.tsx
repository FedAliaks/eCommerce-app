import { LOGIN_PAGE_TEXT } from 'constants/constants';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import authSelector from 'redux/selectors';
import ButtonBig from 'components/button-big/button-big';
import style from './style.module.css';

function LoginPageBtn(): JSX.Element {
  const { emailValue, isEmailValid, passwordValue, isPasswordValid } = useAppSelector(authSelector);

  const handleBtnLogin = (): void => {
    if (isEmailValid && isPasswordValid) {
      console.log('handle login with data: ', { email: emailValue, password: passwordValue });
    }
  };

  const loginPageBtnStyle = (): string =>
    isEmailValid && isPasswordValid
      ? `${style['login-page-btn']}`
      : `${style['login-page-btn']} ${style['btn-not-active']}`;

  return (
    <ButtonBig
      style={loginPageBtnStyle()}
      content={LOGIN_PAGE_TEXT.loginPageBtn}
      onClick={handleBtnLogin}
    />
  );
}

export default LoginPageBtn;
