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
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import toast from 'react-hot-toast';
import classesLocal from './add-new-address.module.css';
import classes from '../UserProfile.module.css';
import { addAddressBreadcrumbList } from '../constants';

type TypeOfAddressType = 'shipping' | 'billing';

export default function AddNewAddress(): JSX.Element {
  const navigate = useNavigate();
  const [street, setStreet] = useState('');
  const [streetErr, setStreetErr] = useState(' ');
  const [postCode, setPostCode] = useState('');
  const [postCodeErr, setPostCodeErr] = useState(' ');
  const [city, setCity] = useState('');
  const [cityErr, setCityErr] = useState(' ');
  const [isActiveSaveBtn, setIsActiveSaveBtn] = useState(false);
  const [typeOfAddress, setTypeOfAddress] = useState('shipping');
  const [IsDefaultAddress, setIsDefaultAddress] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const typeComponent = typeOfAddress as TypeOfAddressType;
  const { billingCountry, shippingCountry } = useAppSelector(registrationFormSelector);

  const checkActiveSaveBtn = () => {
    setIsActiveSaveBtn(!(streetErr || postCodeErr || cityErr));
  };

  const addErrorCustomMsg = () => {
    setCustomMsg('Something went wrong, try again later');
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
    navigate(ROUTE_PATH.profile);
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
                          ? 'addShippingAddressId'
                          : 'addBillingAddressId',
                      addressId: res.body.addresses[res.body.addresses.length - 1]?.id,
                    },
                  ],
                },
              })
              .execute()
              .then((result) => {
                if (IsDefaultAddress) {
                  apiRootWithExistingTokenFlow()
                    .customers()
                    .withId({ ID: result.body.id })
                    .post({
                      body: {
                        version: result.body.version,
                        actions: [
                          {
                            action:
                              typeOfAddress === 'shipping'
                                ? 'setDefaultShippingAddress'
                                : 'setDefaultBillingAddress',
                            addressId: result.body.addresses[result.body.addresses.length - 1]?.id,
                          },
                        ],
                      },
                    })
                    .execute()
                    .then()
                    .catch(() => addErrorCustomMsg());
                }
              })
              .then(() => {
                navigate(ROUTE_PATH.profile);
                toast.success('Your profile has updated successfully');
              });
          })
          .catch(() => addErrorCustomMsg());
      })
      .catch(() => addErrorCustomMsg());
  };

  const chooseTypeOfAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfAddress(e.target.value as TypeOfAddressType);
  };

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefaultAddress(!!e.target.checked);
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
      <Breadcrumb linksList={addAddressBreadcrumbList} currentPageName="Add new address" />

      <div className="container">
        <div className={`${classesLocal['add__address-container']} ${classes['profile__column']}`}>
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
              isChecked={IsDefaultAddress}
            />
          </div>

          <div className={classesLocal['address']}>
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
        <p className={classes['custom-message']}>{customMsg}</p>
        <div className={classes['profile__password-btn-container']}>
          <ButtonDefault content="Cancel" onClick={clearFieldsOnPage} isActive colored={false} />
          <ButtonDefault content="Save" onClick={saveBtnClick} isActive={isActiveSaveBtn} colored />
        </div>
      </div>
    </div>
  );
}
