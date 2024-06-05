import { InputProfileType } from 'components/profile-component/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  errorMsgObj,
  regExpObj,
} from 'views/registration/components/RegistrationForm/components/InputRegistration/utils/checkFields';
import InputProfile from 'components/profile-component/input-profile/inputProfile';
import CheckboxDefault from 'components/checkbox-defaut/CheckboxDefault';
import ButtonDefault from 'components/button-default/ButtonDefault';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { ROUTE_PATH } from 'constants/constants';
import toast from 'react-hot-toast';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from '../UserProfile.module.css';
import classesLocal from './change-address.module.css';
import { changeAddressBreadcrumbList } from '../constants';

export default function ChangeAddress() {
  const errCountryDefault = 'You can use only "BY" and "US"';
  const navigate = useNavigate();

  const location = useLocation();
  const addressID = location.state.addressId;
  const [isActiveSaveBtn, setIsActiveSaveBtn] = useState(true);
  const [resultRequest, setResultRequest] = useState('');

  const [streetErr, setStreetErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [postCodeErr, setPostCodeErr] = useState('');
  const [countryErr, setCountryErr] = useState('');
  const [IsDefaultAddress, setIsDefaultAddress] = useState(false);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('BY');
  const [typeOfAddress, setTypeOfAddress] = useState<'Billing' | 'Shipping' | ''>('');
  const [defaultSavedAddressId, setSavedDefaultAddressId] = useState('');

  useEffect(() => {
    apiRootWithExistingTokenFlow()
      .me()
      .get()
      .execute()
      .then((res) => {
        const address = res.body.addresses.filter((item) => item.id === addressID);
        if (res.body.billingAddressIds?.find((item) => item === addressID)) {
          setTypeOfAddress('Billing');
          setSavedDefaultAddressId(res.body?.defaultBillingAddressId || '');
        } else if (res.body.shippingAddressIds?.find((item) => item === addressID)) {
          setTypeOfAddress('Shipping');
          setSavedDefaultAddressId(res.body?.defaultShippingAddressId || '');
        }
        setStreet(address[0]?.streetName || '');
        setCity(address[0]?.city || '');
        setPostCode(address[0]?.postalCode || '');
        setCountry(address[0]?.country || 'US');
        setIsDefaultAddress(
          res.body.defaultBillingAddressId === addressID ||
            res.body.defaultShippingAddressId === addressID,
        );
      });
  }, []);

  const addErrorMsg = () => {
    setResultRequest('Something went wrong, try again later');
  };

  const checkActiveSaveBtn = () => {
    setResultRequest('');
    if (streetErr || cityErr || countryErr || postCodeErr) {
      setIsActiveSaveBtn(false);
    } else setIsActiveSaveBtn(true);
  };

  const postRequest = () => {
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
                  action: 'changeAddress',
                  addressId: addressID,
                  address: {
                    city,
                    country: country || 'US',
                    streetName: street,
                    postalCode: postCode,
                  },
                },
              ],
            },
          })
          .execute()
          .then((res1) => {
            if (typeOfAddress && defaultSavedAddressId !== addressID)
              apiRootWithExistingTokenFlow()
                .customers()
                .withId({ ID: res1.body.id })
                .post({
                  body: {
                    version: res1.body.version,
                    actions: [
                      {
                        action:
                          typeOfAddress === 'Shipping'
                            ? 'setDefaultShippingAddress'
                            : 'setDefaultBillingAddress',
                        addressId: addressID,
                      },
                    ],
                  },
                })
                .execute()
                .then()
                .catch(() => addErrorMsg());
          })
          .then(() => {
            navigate(ROUTE_PATH.profile);
            toast.success('Your profile has updated successfully');
          })
          .catch(() => addErrorMsg());
      })
      .catch(() => addErrorMsg());
  };

  const checkStreet = (value: string) => {
    setResultRequest('');
    setStreet(value);
    if (regExpObj.billingStreet.test(value)) {
      setStreetErr('');
    } else setStreetErr(errorMsgObj.billingStreet);
    checkActiveSaveBtn();
  };

  const checkPostCode = (value: string) => {
    setResultRequest('');
    setPostCode(value);
    if (regExpObj.billingPostCode.test(value)) {
      setPostCodeErr('');
      checkActiveSaveBtn();
    } else setPostCodeErr(errorMsgObj.billingPostCode);
  };

  const checkCity = (value: string) => {
    setResultRequest('');
    setCity(value);
    if (regExpObj.billingCity.test(value)) {
      setCityErr('');
      checkActiveSaveBtn();
    } else setCityErr(errorMsgObj.billingCity);
    checkActiveSaveBtn();
  };

  const checkCountry = (value: string) => {
    setResultRequest('');
    setCountry(value);
    if (value === 'US' || value === 'BY') {
      setCountryErr('');
      checkActiveSaveBtn();
    } else {
      setCountryErr(errCountryDefault);
    }
  };

  const clearBtn = () => {
    navigate(ROUTE_PATH.profile);
  };

  const addressArray: InputProfileType[] = [
    {
      title: 'Street',
      id: 'Street',
      isSizeSmall: true,
      type: 'text',
      isDisabled: false,
      errorMsg: streetErr,
      value: street,
      handler: (e) => checkStreet(e.target.value),
    },
    {
      title: 'Post code',
      id: 'PostCode',
      isSizeSmall: true,
      type: 'text',
      isDisabled: false,
      errorMsg: postCodeErr,
      value: postCode,
      handler: (e) => checkPostCode(e.target.value),
    },
    {
      title: 'City',
      id: 'City',
      isSizeSmall: true,
      type: 'text',
      isDisabled: false,
      errorMsg: cityErr,
      value: city,
      handler: (e) => checkCity(e.target.value),
    },
    {
      title: 'Country',
      id: `country`,
      isSizeSmall: true,
      type: 'text',
      isDisabled: false,
      errorMsg: countryErr,
      value: country,
      handler: (e) => checkCountry(e.target.value),
    },
  ];

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResultRequest('');
    setIsDefaultAddress(!!e.target.checked);
  };

  const deleteRequest = () => {
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
                  action: 'removeAddress',
                  addressId: addressID,
                },
              ],
            },
          })
          .execute()
          .then(() => {
            navigate(ROUTE_PATH.profile);
            toast.success('Address deleted successfully');
          })
          .catch(() => addErrorMsg());
      })
      .catch(() => addErrorMsg());
  };

  return (
    <>
      <Breadcrumb linksList={changeAddressBreadcrumbList} currentPageName="Change Address" />

      <div className="container">
        <div className={`${classesLocal['add-address__container']} ${classes['profile__column']}`}>
          <h2>{typeOfAddress} Address</h2>
          <CheckboxDefault
            content="Set as default address"
            onChange={toggleCheckbox}
            isChecked={IsDefaultAddress}
          />

          <div className={classesLocal['address']}>
            {addressArray.map((item) => (
              <InputProfile
                title={item.title}
                id={item.id}
                isSizeSmall={item.isSizeSmall}
                type={item.type}
                value={item.value}
                key={item.id}
                errorMsg={item.errorMsg}
                isDisabled={item.isDisabled}
                handler={item.handler}
              />
            ))}
          </div>
          <p className={classesLocal['response']}>{resultRequest}</p>
        </div>

        <div className={`${classes['profile__password-btn-container']}`}>
          <ButtonProfile content="Cancel" colored={false} onClick={clearBtn} />
          <ButtonDefault content="Save" colored onClick={postRequest} isActive={isActiveSaveBtn} />
          <ButtonDefault content="Delete" colored={false} onClick={deleteRequest} isActive />
        </div>
      </div>
    </>
  );
}
