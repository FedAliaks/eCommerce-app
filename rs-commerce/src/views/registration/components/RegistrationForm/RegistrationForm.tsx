import AccountRegistration from './components/AccautnRegistration/AccountRegistration';
import AddressRegistration from './components/AddressRegistration/AddressRegistration';
import ButtonRegistration from './components/ButtonRegistration/ButtonRegistration';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  return (
    <form action="#">
      <div className={classes['registration-form__wrapper']}>
        <AccountRegistration />
        <AddressRegistration />
      </div>
      <ButtonRegistration />
    </form>
  );
}

export default RegistrationForm;
