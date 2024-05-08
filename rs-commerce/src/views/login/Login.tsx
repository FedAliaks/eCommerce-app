import LoginPageForm from 'components/login-page-form/login-page-form';
import style from './style.module.css';

function Login() {
  return (
    <div className={style['login-page']}>
      <div className={style['login-page-wrapper']}>
        <LoginPageForm />
        <div className={style['login-page-image']} />
      </div>
    </div>
  );
}

export default Login;
