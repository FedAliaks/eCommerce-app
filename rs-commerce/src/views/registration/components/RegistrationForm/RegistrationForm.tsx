import ButtonBig from 'components/button-big/button-big';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { registrationFormSelector } from 'redux/selectors';
import { RegistrationCustomerType } from 'api/types';
import {
  addBillingAddress,
  addCustomerParameters,
  addDefaultAddress,
  addShippingAddress,
  createCustomer,
  getAddresses,
} from 'api/createCustomer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { useDispatch } from 'react-redux';
import AccountRegistration from './components/AccautnRegistration/AccountRegistration';
import AddressRegistration from './components/AddressRegistration/AddressRegistration';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  const {
    dateOfBirth,
    firstName,
    lastName,
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
    defaultBillingAddress,
    defaultShippingAddress,
  } = useAppSelector(registrationFormSelector);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ButtonRegistrationClick = async (): Promise<void> => {
    const bodyRegistration: RegistrationCustomerType = {
      email,
      password,
    };

    // Create the customer and output the Customer ID
    await createCustomer(bodyRegistration)
      .then(({ body }) => {
        const idCustomer = body.customer.id;
        const { version } = body.customer;

        addCustomerParameters(
          idCustomer,
          {
            firstName,
            lastName,
            dateOfBirth,
            billingStreet,
            billingCity,
            billingCountry,
            billingPostCode,
            shippingCity,
            shippingCountry,
            shippingPostCode,
            shippingStreet,
            defaultBillingAddress,
            defaultShippingAddress,
          },
          version,
        )
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
                        if (defaultBillingAddress) {
                          addDefaultAddress(
                            idCustomer,
                            dataObj.body.version as number,
                            dataObj.body?.addresses[0]?.id as string,
                            'setDefaultBillingAddress',
                          )
                            .then((data) => console.log(data))
                            .catch(console.error);
                        }

                        if (defaultShippingAddress) {
                          addDefaultAddress(
                            idCustomer,
                            dataObj.body.version as number,
                            dataObj.body?.addresses[1]?.id as string,
                            'setDefaultShippingAddress',
                          )
                            .then((defaultAddressObj) => console.log(defaultAddressObj))
                            .catch(console.error);
                        }

                        dispatch(apiAuthActions.startAuth({ data: { email, password } }));
                        navigate(ROUTE_PATH.main);
                      })
                      .catch(console.error);
                  })
                  .catch(console.error);
              })
              .catch(console.error),
          )
          .catch(console.error);
      })
      .catch((error) => {
        if (error.message === 'There is already an existing customer with the provided email.') {
          console.log('email exist');
          setErrorMsg('Your email has already exist in our system');
        } else {
          setErrorMsg('Something is wrong. Try again later');
        }
      });
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
      <div className={classes['registration-form__button']}>
        <ButtonBig
          isActiveStyle={isActiveStyle()}
          content="Registration"
          onClick={ButtonRegistrationClick}
        />
      </div>

      <p className={classes['registration__error']}>{errorMsg}</p>
    </form>
  );
}

export default RegistrationForm;
