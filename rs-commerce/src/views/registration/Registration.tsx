import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import TitleRegistration from './components/TitleRegistration/TitleRegistration';
import classes from './style.module.css';

function Registration(): JSX.Element {
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
