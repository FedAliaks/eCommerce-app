import ButtonBig from 'components/button-big/button-big';
import AccountRegistration from './components/AccautnRegistration/AccountRegistration';
import AddressRegistration from './components/AddressRegistration/AddressRegistration';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  const ButtonRegistrationClick = (): void => {
    console.log('start regustration');
  };

  const isActiveStyle = (): boolean => false;

  return (
    <form action="#">
      <div className={classes['registration-form__wrapper']}>
        <AccountRegistration />
        <AddressRegistration />
      </div>
      <ButtonBig
        isActiveStyle={isActiveStyle()}
        content="Registration"
        onClick={ButtonRegistrationClick}
      />
    </form>
  );
}

export default RegistrationForm;
