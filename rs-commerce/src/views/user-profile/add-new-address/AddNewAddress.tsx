import CountryInput from 'views/registration/components/RegistrationForm/components/InputRegistration/CountryInput';
import { registrationFormSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useState } from 'react';
import CheckboxDefault from 'components/checkbox-defaut/CheckboxDefault';
import RadioButtonDefault, {
  RadioButtonDefaultType,
} from 'components/radio-button-default/RadioButtonDefault';
import ButtonDefault from 'components/button-default/ButtonDefault';
import {
  errorMsgObj,
  regExpObj,
} from 'views/registration/components/RegistrationForm/components/InputRegistration/utils/checkFields';
import InputDefault, { InputDefaultType } from 'components/input-default/InputDefault';
import classesLocal from './add-new-address.module.css';
import classes from '../UserProfile.module.css';
import UserProfileHeader from '../user-profile-header/UserProfileHeader';

type TypeOfAddressType = 'shipping' | 'billing';

export default function AddNewAddress(): JSX.Element {
  const [street, setStreet] = useState('');
  const [streetErr, setStreetErr] = useState(' ');
  const [postCode, setPostCode] = useState('');
  const [postCodeErr, setPostCodeErr] = useState(' ');
  const [city, setCity] = useState('');
  const [cityErr, setCityErr] = useState(' ');
  const [isActiveSaveBtn, setIsActiveSaveBtn] = useState(false);
  const [typeOfAddress, setTypeOfAddress] = useState('shipping');
  const [IsDefaultAddress, setIsDefaultAddress] = useState(true);
  const [resultRequest, setResultRequest] = useState('');

  const typeComponent = typeOfAddress as TypeOfAddressType;
  const { billingCountry, shippingCountry } = useAppSelector(registrationFormSelector);

  const checkActiveSaveBtn = () => {
    setIsActiveSaveBtn(!(streetErr || postCodeErr || cityErr));
  };

  const checkPostCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regExpObj.billingPostCode.test(e.target.value)) {
      setPostCodeErr('');
      setPostCode(e.target.value);
    } else {
      setPostCodeErr(errorMsgObj.billingPostCode);
    }
    checkActiveSaveBtn();
  };

  const checkCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regExpObj.billingCity.test(e.target.value)) {
      setCityErr('');
      setCity(e.target.value);
    } else {
      setCityErr(errorMsgObj.billingCity);
    }
    checkActiveSaveBtn();
  };

  const checkStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regExpObj.billingStreet.test(e.target.value)) {
      setStreetErr('');
      setStreet(e.target.value);
    } else {
      setStreetErr(errorMsgObj.shippingStreet);
    }
    checkActiveSaveBtn();
  };

  const inputFieldsArray: InputDefaultType[] = [
    {
      title: 'Post code',
      errorContent: postCodeErr,
      htmlFor: 'post-code',
      type: 'text',
      smallSize: false,
      isActive: true,
      placeholder: 'enter your post code',
      handler: checkPostCode,
    },

    {
      title: 'City',
      errorContent: cityErr,
      htmlFor: 'city',
      type: 'text',
      smallSize: false,
      isActive: true,
      placeholder: 'enter your city',
      handler: checkCity,
    },

    {
      title: 'Street',
      errorContent: streetErr,
      htmlFor: 'street',
      type: 'text',
      smallSize: false,
      isActive: true,
      placeholder: 'enter your street',
      handler: checkStreet,
    },
  ];

  const clearFieldsOnPage = () => {
    setCity('');
    setStreet('');
    setPostCode('');
  };

  const saveBtnClick = () => {
    apiRootWithExistingTokenFlow()
      .me()
      .get()
      .execute()
      .then((resOuter) => {
        apiRootWithExistingTokenFlow()
          .customers()
          .withId({ ID: resOuter.body.id })
          .post({
            body: {
              version: resOuter.body.version,
              actions: [
                {
                  action: 'addAddress',
                  address: {
                    country: shippingCountry || billingCountry || 'US',
                    postalCode: postCode,
                    streetName: street,
                    city,
                  },
                },
              ],
            },
          })
          .execute()
          .then(() => {
            apiRootWithExistingTokenFlow()
              .me()
              .get()
              .execute()
              .then((resInner) => {
                apiRootWithExistingTokenFlow()
                  .customers()
                  .withId({ ID: resInner.body.id })
                  .get()
                  .execute()
                  .then((response) => {
                    setResultRequest('You have added address');
                    setTimeout(() => setResultRequest(''), 5000);

                    apiRootWithExistingTokenFlow()
                      .me()
                      .get()
                      .execute()
                      .then((res1) => {
                        apiRootWithExistingTokenFlow()
                          .customers()
                          .withId({ ID: res1.body.id })
                          .post({
                            body: {
                              version: res1.body.version,
                              actions: [
                                {
                                  action:
                                    typeOfAddress === 'shipping'
                                      ? 'addShippingAddressId'
                                      : 'addBillingAddressId',
                                  addressId:
                                    response.body.addresses[response.body.addresses.length - 1]?.id,
                                },
                              ],
                            },
                          })
                          .execute()
                          .then(() => {
                            if (!IsDefaultAddress) {
                              apiRootWithExistingTokenFlow()
                                .me()
                                .get()
                                .execute()
                                .then((res) => {
                                  apiRootWithExistingTokenFlow()
                                    .customers()
                                    .withId({ ID: res.body.id })
                                    .post({
                                      body: {
                                        version: res.body.version,
                                        actions: [
                                          {
                                            action:
                                              typeOfAddress === 'shipping'
                                                ? 'setDefaultShippingAddress'
                                                : 'setDefaultBillingAddress',
                                            addressId:
                                              response.body.addresses[
                                                response.body.addresses.length - 1
                                              ]?.id,
                                          },
                                        ],
                                      },
                                    })
                                    .execute()
                                    .then()
                                    .catch();
                                });
                            }
                          });
                      });
                  });
              });
          });
      });
  };

  const chooseTypeOfAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfAddress(e.target.value as TypeOfAddressType);
  };

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefaultAddress(!e.target.checked);
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

            {inputFieldsArray.map((item) => (
              <InputDefault
                title={item.title}
                errorContent={item.errorContent}
                type={item.type}
                handler={item.handler}
                smallSize={item.smallSize}
                isActive={item.isActive}
                placeholder={item.placeholder}
                htmlFor={item.htmlFor}
                key={item.title}
              />
            ))}
          </div>
        </div>
        <p className={classesLocal['response']}>{resultRequest}</p>
        <div className={classes['profile__password-btn-container']}>
          <ButtonDefault content="Cancel" onClick={clearFieldsOnPage} isActive colored={false} />
          <ButtonDefault content="Save" onClick={saveBtnClick} isActive={isActiveSaveBtn} colored />
        </div>
      </div>
    </div>
  );
}
