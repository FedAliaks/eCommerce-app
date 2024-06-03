import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import ProfileComponent from 'components/profile-component/profileComponent';
import { InputProfileType } from 'components/profile-component/types';
import classes from '../UserProfile.module.css';
import ButtonProfile from '../button-profile/ButtonProfile';
import UserProfileHeader from '../user-profile-header/UserProfileHeader';

export default function ChangeAddress() {
  const { userData } = useAppSelector(apiAuthSelector);

  const btnClick = () => {
    console.log('click');
  };

  const shippingAddressArray: InputProfileType[][] = [];
  const billingAddressArray: InputProfileType[][] = [];
  const addressesArray = userData?.customer.addresses;

  addressesArray?.forEach((item) => {
    const array: InputProfileType[] = [
      {
        title: 'Street',
        id: `street-${item.id}`,
        isSizeSmall: true,
        type: 'text',
        isDisabled: false,
        errorMsg: 'error',
        value: item.streetName,
        handler: btnClick,
      },
      {
        title: 'Post code',
        id: `postCode-${item.id}`,
        isSizeSmall: true,
        type: 'text',
        isDisabled: false,
        errorMsg: 'error',
        value: item.postalCode,
        handler: btnClick,
      },
      {
        title: 'City',
        id: `city-${item.id}`,
        isSizeSmall: true,
        type: 'text',
        isDisabled: false,
        errorMsg: 'error',
        value: item.city,
        handler: btnClick,
      },
      {
        title: 'Country',
        id: `country-${item.id}`,
        isSizeSmall: true,
        type: 'text',
        isDisabled: false,
        errorMsg: 'error',
        value: item.country,
        handler: btnClick,
      },
    ];
    if (item.externalId === 'shipping') {
      shippingAddressArray.push(array);
    } else billingAddressArray.push(array);
  });

  return (
    <div>
      <UserProfileHeader title="Change Address" subtitle="Main > Profile > Edit address" />
      <h1>Address information</h1>

      <div className={classes['profile']}>
        <div className={classes['profile__column']}>
          <h2>Shipping addresses</h2>

          {shippingAddressArray.map((item) => (
            <ProfileComponent inputArray={item} />
          ))}
        </div>
        <div className={classes['profile__column']}>
          <h2>Billing addresses</h2>
          {billingAddressArray.map((item) => (
            <ProfileComponent inputArray={item} />
          ))}
        </div>
      </div>
      <div className={classes['profile__password-btn-container']}>
        <ButtonProfile content="Cancel" colored={false} onClick={btnClick} />
        <ButtonProfile content="Save" colored={false} onClick={btnClick} />
        <ButtonProfile content="Add address" colored onClick={btnClick} />
      </div>
    </div>
  );
}
