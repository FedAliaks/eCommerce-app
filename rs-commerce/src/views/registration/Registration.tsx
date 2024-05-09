import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import classes from './style.module.css';

function Registration() {
  return (
    <div className={classes['registrationContainer']}>
      <div className={classes['registrationForm']}>
        <p className={classes['formTitle']}>Registration Field</p>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Registration;
