import ButtonBig from 'components/button-big/button-big';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { registrationFormSelector } from 'redux/selectors';
import AccountRegistration from './components/AccautnRegistration/AccountRegistration';
import AddressRegistration from './components/AddressRegistration/AddressRegistration';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  const {
    dateOfBirth,
    billingCity,
    shippingCity,
    billingStreet,
    shippingStreet,
    email,
    password,
    billingCountry,
    billingPostCode,
    shippingCountry,
    shippingPostCode,
  } = useAppSelector(registrationFormSelector);

  const ButtonRegistrationClick = (): void => {
    console.log('start registration');
  };

  const isActiveStyle = (): boolean =>
    !!dateOfBirth &&
    !!billingCity &&
    !!shippingCity &&
    !!billingStreet &&
    !!shippingStreet &&
    !!email &&
    !!password &&
    !!billingCountry &&
    !!billingPostCode &&
    !!shippingCountry &&
    !!shippingPostCode;

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
