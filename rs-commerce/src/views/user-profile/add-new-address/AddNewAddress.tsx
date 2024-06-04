import { HtmlForType, InputType } from 'types/registrationTypes';
import InputRegistration from 'views/registration/components/RegistrationForm/components/InputRegistration/InputRegistration';
import CountryInput from 'views/registration/components/RegistrationForm/components/InputRegistration/CountryInput';
import { apiAuthSelector, registrationFormSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { registrationFormActions } from 'redux/slices/registration-slice';
import CheckboxDefault from 'components/checkbox-defaut/CheckboxDefault';
import RadioButtonDefault, {
  RadioButtonDefaultType,
} from 'components/radio-button-default/RadioButtonDefault';
import ButtonProfile from '../button-profile/ButtonProfile';
import classesLocal from './add-new-address.module.css';
import classes from '../UserProfile.module.css';
import UserProfileHeader from '../user-profile-header/UserProfileHeader';

const inputFieldsArray: InputType[] = [
  {
    htmlFor: `PostCode` as HtmlForType,
    title: 'Post code',
    type: 'text',
    placeholder: 'your post code',
    smallSize: true,
  },

  {
    htmlFor: `City` as HtmlForType,
    title: 'City',
    type: 'text',
    placeholder: 'your city',
    smallSize: true,
  },

  {
    htmlFor: `Street` as HtmlForType,
    title: 'Street',
    type: 'text',
    placeholder: 'your street',
    smallSize: true,
  },
];

export default function AddNewAddress(): JSX.Element {
  const { userData } = useAppSelector(apiAuthSelector);
  const [resultRequest, setResultRequest] = useState('');
  const [typeOfAddress, setTypeOfAddress] = useState('shipping');
  const [IsDefaultAddress, setIsDefaultAddress] = useState(false);
  const dispatch = useDispatch();
  const typeComponent = 'shipping';
  const {
    billingCity,
    shippingCity,
    billingStreet,
    shippingStreet,
    billingCountry,
    billingPostCode,
    shippingCountry,
    shippingPostCode,
  } = useAppSelector(registrationFormSelector);

  const clearFieldsOnPage = () => {
    console.log('clear');
  };

  const saveBtnClick = () => {
    console.log('save');

    const request = {
      country: typeComponent === 'shipping' ? shippingCountry : billingCountry,
      postCode: typeComponent === 'shipping' ? shippingPostCode : billingPostCode,
      street: typeComponent === 'shipping' ? shippingStreet : billingStreet,
      city: typeComponent === 'shipping' ? shippingCity : billingCity,
    };

    if (!Object.values(request).every((item) => Boolean(item) === true)) {
      setResultRequest('Fill all fields');
      setTimeout(() => setResultRequest(''), 2000);
    } else if (userData) {
      apiRootWithExistingTokenFlow()
        .customers()
        .withId({ ID: userData?.customer.id })
        .post({
          body: {
            version: userData.customer.version,
            actions: [
              {
                action: 'addAddress',

                address: {
                  country: typeComponent === 'shipping' ? shippingCountry : billingCountry,
                  postalCode: typeComponent === 'shipping' ? shippingPostCode : billingPostCode,
                  streetName: typeComponent === 'shipping' ? shippingStreet : billingStreet,
                  city: typeComponent === 'shipping' ? shippingCity : billingCity,
                },
              },
            ],
          },
        })
        .execute()
        .then(() => {
          apiRootWithExistingTokenFlow()
            .customers()
            .withId({ ID: userData.customer.id })
            .get()
            .execute()
            .then((response) => {
              dispatch(apiAuthActions.setUserData({ customer: response.body }));
              setResultRequest('You have added address');
              setTimeout(() => setResultRequest(''), 5000);

              apiRootWithExistingTokenFlow()
                .customers()
                .withId({ ID: userData.customer.id })
                .post({
                  body: {
                    version: userData.customer.version + 1,
                    actions: [
                      {
                        action:
                          typeComponent === 'shipping'
                            ? 'addShippingAddressId'
                            : 'addBillingAddressId',
                        addressId: response.body.addresses[response.body.addresses.length - 1]?.id,
                      },
                    ],
                  },
                })
                .execute()
                .then((responseNew) =>
                  dispatch(apiAuthActions.setUserData({ customer: responseNew.body })),
                );
            });
        });

      dispatch(registrationFormActions.setBillingCity(''));
      dispatch(registrationFormActions.setBillingCountry(''));
      dispatch(registrationFormActions.setBillingPostCode(''));
      dispatch(registrationFormActions.setBillingStreet(''));
      dispatch(registrationFormActions.setShippingCity(''));
      dispatch(registrationFormActions.setShippingCountry(''));
      dispatch(registrationFormActions.setShippingPostCode(''));
      dispatch(registrationFormActions.setShippingStreet(''));
    }
  };

  const chooseTypeOfAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfAddress(e.target.value);
    console.log(e.target.value);
  };

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefaultAddress(!e.target.checked);
    console.log(IsDefaultAddress);
  };

  const radioButtonsArray: RadioButtonDefaultType[] = [
    {
      name: 'address',
      id: 'shipping',
      onChange: chooseTypeOfAddress,
      value: 'shipping',
      valueForCheck: typeOfAddress,
      content: 'Shipping address',
    },
    {
      name: 'address',
      id: 'billing',
      onChange: chooseTypeOfAddress,
      value: 'billing',
      valueForCheck: typeOfAddress,
      content: 'Billing address',
    },
  ];

  return (
    <div>
      <UserProfileHeader title="Add new address" subtitle="Main > Profile > Add address" />
      <div>
        <div className={classesLocal['add__address-container']}>
          <div>
            <h3>Select Type of Address</h3>

            <div className={classesLocal['radio-button__container']}>
              {radioButtonsArray.map((item) => (
                <RadioButtonDefault
                  id={item.id}
                  onChange={item.onChange}
                  name={item.name}
                  value={item.value}
                  valueForCheck={item.valueForCheck}
                  content={item.content}
                  key={item.value}
                />
              ))}
            </div>

            <CheckboxDefault
              content="Set as default address"
              idCheckbox="default-address"
              onChange={toggleCheckbox}
            />
          </div>

          <div className={classes['address']}>
            <CountryInput typeComponent={typeComponent} />

            {inputFieldsArray.map((item: InputType) => (
              <InputRegistration
                input={{
                  htmlFor: `${typeComponent}${item.htmlFor}` as HtmlForType,
                  title: item.title,
                  type: item.type,
                  placeholder: item.placeholder,
                  smallSize: item.smallSize,
                }}
                key={`${typeComponent}${item.htmlFor}`}
                errorClassName={classes['error']}
              />
            ))}
          </div>
        </div>
        <p className={classesLocal['response']}>{resultRequest}</p>
        <div className={classes['profile__password-btn-container']}>
          <ButtonProfile content="Cancel" colored={false} onClick={clearFieldsOnPage} />
          <ButtonProfile page="name" content="Save" colored onClick={saveBtnClick} />
        </div>
      </div>
    </div>
  );
}
