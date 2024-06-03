import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import { InputProfileType } from 'components/profile-component/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { countryArr } from 'views/registration/components/RegistrationForm/components/InputRegistration/CountryInput';
import AddressTitleComponent from 'views/registration/components/RegistrationForm/components/AddressRegistration/components/AddressComponents/components/AddresTitleComponent/AddresTitleComponent';
import { useState } from 'react';
import {
  errorMsgObj,
  regExpObj,
} from 'views/registration/components/RegistrationForm/components/InputRegistration/utils/checkFields';
import InputProfile from 'components/profile-component/input-profile/inputProfile';
import UserProfileHeader from '../user-profile-header/UserProfileHeader';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from '../UserProfile.module.css';
import classesLocal from './change-address.module.css';

export default function ChangeAddress() {
  const { userData } = useAppSelector(apiAuthSelector);
  const errCountryDefault = 'You can use only "BY" and "US"';

  const navigate = useNavigate();
  const location = useLocation();
  const typeComponent = 'shipping';
  const [resultRequest] = useState('result request');

  const [streetErr, setStreetErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [postCodeErr, setPostCodeErr] = useState('');
  const [countryErr, setCountryErr] = useState('');

  const [street, setStreet] = useState('street');
  const [city, setCity] = useState('city');
  const [postCode, setPostCode] = useState('postCode');
  const [country, setCountry] = useState(countryArr[0]);

  console.log(location.state.addressId);

  const addressID = location.state.addressId;

  if (userData)
    apiRootWithExistingTokenFlow()
      .customers()
      .withId({ ID: userData.customer.id })
      .get()
      .execute()
      .then((res) => {
        const address = res.body.addresses.filter((item) => item.id === addressID);
        console.log(address);
        setStreet(address[0]?.streetName || '');
        setPostCode(address[0]?.postalCode || '');
        setCountry(address[0]?.country);
        setCity(address[0]?.city || '');
      });

  const postRequest = () => {
    console.log('click');
  };

  const checkStreet = (value: string) => {
    setStreet(value);
    if (regExpObj.billingStreet.test(value)) {
      setStreetErr('');
    } else setStreetErr(errorMsgObj.billingStreet);
  };

  const checkPostCode = (value: string) => {
    setPostCode(value);
    if (regExpObj.billingPostCode.test(value)) {
      setPostCodeErr('');
    } else setPostCodeErr(errorMsgObj.billingPostCode);
  };

  const checkCity = (value: string) => {
    setCity(value);
    if (regExpObj.billingCity.test(value)) {
      setCityErr('');
    } else setCityErr(errorMsgObj.billingCity);
  };

  const checkCountry = (value: string) => {
    setCountry(value);
    if (value === 'US' || value === 'BY') {
      setCountryErr('');
    } else {
      setCountryErr(errCountryDefault);
    }
  };

  const clearBtn = () => {
    setCity('');
    setCountry('');
    setPostCode('');
    setCountry('');
    checkCity('');
    checkCountry('');
    checkPostCode('');
    checkStreet('');
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

  const addNewAddress = () => {
    navigate(ROUTE_PATH.addNewAddress);
  };

  return (
    <div>
      <UserProfileHeader title="Change Address" subtitle="Main > Profile > Edit address" />
      <div className={classesLocal['add__address-container']}>
        <AddressTitleComponent typeComponent={typeComponent} />

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
      <p className={classesLocal['response']}>{resultRequest}</p>

      <div className={classes['profile__password-btn-container']}>
        <ButtonProfile content="Cancel" colored={false} onClick={clearBtn} />
        <ButtonProfile content="Save" colored onClick={postRequest} />
        <ButtonProfile content="Add address" colored onClick={addNewAddress} />
      </div>
    </div>
  );
}
