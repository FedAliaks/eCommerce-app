import LoginPageForm from 'components/login-page-form/login-page-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTE_PATH } from 'constants/constants';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import style from './style.module.css';

function Login() {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(apiAuthSelector);

  useEffect(() => {
    if (isAuth) navigate(ROUTE_PATH.main);
  }, [isAuth]);

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
