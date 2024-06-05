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
import { ROUTE_PATH } from 'constants/constants';
import UserProfileHeader from '../user-profile-header/UserProfileHeader';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from '../UserProfile.module.css';
import classesLocal from './change-address.module.css';

export default function ChangeAddress() {
  const errCountryDefault = 'You can use only "BY" and "US"';
  const navigate = useNavigate();

  const location = useLocation();
  const addressID = location.state.addressId;
  const [isActiveSaveBtn, setIsActiveSaveBtn] = useState(true);

  const [streetErr, setStreetErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [postCodeErr, setPostCodeErr] = useState('');
  const [countryErr, setCountryErr] = useState('');
  const [, setIsDefaultAddress] = useState(true);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('BY');

  useEffect(() => {
    apiRootWithExistingTokenFlow()
      .me()
      .get()
      .execute()
      .then((res) => {
        const address = res.body.addresses.filter((item) => item.id === addressID);
        setStreet(address[0]?.streetName || '');
        setCity(address[0]?.city || '');
        setPostCode(address[0]?.postalCode || '');
        setCountry(address[0]?.country || 'US');
      });
  }, []);

  const checkActiveSaveBtn = () => {
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
          .then(() => {
            navigate(ROUTE_PATH.profile);
          });
      });
  };

  const checkStreet = (value: string) => {
    setStreet(value);
    if (regExpObj.billingStreet.test(value)) {
      setStreetErr('');
    } else setStreetErr(errorMsgObj.billingStreet);
    checkActiveSaveBtn();
  };

  const checkPostCode = (value: string) => {
    setPostCode(value);
    if (regExpObj.billingPostCode.test(value)) {
      setPostCodeErr('');
      checkActiveSaveBtn();
    } else setPostCodeErr(errorMsgObj.billingPostCode);
  };

  const checkCity = (value: string) => {
    setCity(value);
    if (regExpObj.billingCity.test(value)) {
      setCityErr('');
      checkActiveSaveBtn();
    } else setCityErr(errorMsgObj.billingCity);
    checkActiveSaveBtn();
  };

  const checkCountry = (value: string) => {
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
    setIsDefaultAddress(!e.target.checked);
  };

  return (
    <div>
      <UserProfileHeader title="Change Address" subtitle="Main > Profile > Edit address" />
      <div className={classesLocal['add-address__container']}>
        <h1>Address</h1>
        <CheckboxDefault content="Set as default address" onChange={toggleCheckbox} />

        <div className={classes['address']}>
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

          <div />
        </div>
      </div>

      <div className={classes['profile__password-btn-container']}>
        <ButtonProfile content="Cancel" colored={false} onClick={clearBtn} />
        <ButtonDefault content="Save" colored onClick={postRequest} isActive={isActiveSaveBtn} />
      </div>
    </div>
  );
}
