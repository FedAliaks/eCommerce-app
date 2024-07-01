import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import { useEffect } from 'react';
import { ROUTE_PATH } from 'constants/constants';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import TitleRegistration from './components/TitleRegistration/TitleRegistration';
import classes from './style.module.css';

function Registration(): JSX.Element {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(apiAuthSelector);

  useEffect(() => {
    if (isAuth) navigate(ROUTE_PATH.main);
  }, [isAuth]);

  return (
    <div className={classes['registration']}>
      <div className={classes['registration__wrapper']}>
        <TitleRegistration />
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Registration;
