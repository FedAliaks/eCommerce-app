import ButtonBig from 'components/button-big/button-big';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { registrationFormSelector } from 'redux/selectors';
import { CustomerParametersType, RegistrationCustomerType } from 'api/types';
import { addCustomerParameters, createCustomer } from 'api/createCustomer';
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

  const ButtonRegistrationClick = async (): Promise<void> => {
    console.log('start registration');

    const bodyRegistration: RegistrationCustomerType = {
      email: 'finqqwerwe123234@mail.ru',
      password: 'examplePassword',
    };

    const objParameters: CustomerParametersType = {
      firstCustomerName: 'first Name',
      lastCustomerName: 'last Name',
      dateOfBirth: '2000-01-01',
      billingStreet: 'string',
      billingCity: 'string',
      billingPostCode: 'string',
      billingCountry: 'DE',
      shippingCity: 'string',
      shippingStreet: 'string',
      shippingPostCode: 'string',
      shippingCountry: 'BY',
    };

    // Create the customer and output the Customer ID
    await createCustomer(bodyRegistration)
      .then(({ body }) => {
        const idCustomer = body.customer.id;
        console.log(idCustomer);
        const { version } = body.customer;

        addCustomerParameters(idCustomer, objParameters, version).then().catch(console.error);
      })
      .catch(console.error);
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

  console.log(isActiveStyle);

  return (
    <form action="#">
      <div className={classes['registration-form__wrapper']}>
        <AccountRegistration />
        <AddressRegistration />
      </div>
      <ButtonBig isActiveStyle content="Registration" onClick={ButtonRegistrationClick} />
    </form>
  );
}

export default RegistrationForm;
