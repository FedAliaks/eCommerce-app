import ButtonBig from 'components/button-big/button-big';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { registrationFormSelector } from 'redux/selectors';
import { CustomerParametersType, RegistrationCustomerType } from 'api/types';
import {
  addBillingAddress,
  addCustomerParameters,
  addDefaultAddress,
  addShippingAddress,
  createCustomer,
  getAddresses,
} from 'api/createCustomer';
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
    const bodyRegistration: RegistrationCustomerType = {
      email: 'finalwe11rwerwer1@mail.ru',
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
      defaultBillingAddress: false,
      defaultShippingAddress: true,
    };

    // Create the customer and output the Customer ID
    await createCustomer(bodyRegistration)
      .then(({ body }) => {
        const idCustomer = body.customer.id;
        const { version } = body.customer;

        addCustomerParameters(idCustomer, objParameters, version)
          .then(() =>
            getAddresses(idCustomer)
              .then((response) => {
                addBillingAddress(
                  idCustomer,
                  response.body.version,
                  response.body?.addresses[0]?.id as string,
                )
                  .then((dataRequest) => {
                    addShippingAddress(
                      idCustomer,
                      dataRequest.body.version,
                      dataRequest.body?.addresses[1]?.id as string,
                    )
                      .then((dataObj) => {
                        if (objParameters.defaultBillingAddress) {
                          addDefaultAddress(
                            idCustomer,
                            dataObj.body.version as number,
                            dataObj.body?.addresses[0]?.id as string,
                            'setDefaultBillingAddress',
                          )
                            .then((data) => console.log(data))
                            .catch(console.error);
                        }

                        if (objParameters.defaultShippingAddress) {
                          addDefaultAddress(
                            idCustomer,
                            dataObj.body.version as number,
                            dataObj.body?.addresses[1]?.id as string,
                            'setDefaultShippingAddress',
                          )
                            .then((defaultAddressObj) => console.log(defaultAddressObj))
                            .catch(console.error);
                        }
                      })
                      .catch(console.error);
                  })
                  .catch(console.error);
              })
              .catch(console.error),
          )
          .catch(console.error);
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
