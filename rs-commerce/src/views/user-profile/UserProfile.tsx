import ProfileComponent from 'components/profile-component/profileComponent';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import { InputProfileType, ProfileComponentType } from 'components/profile-component/types';
import classes from './UserProfile.module.css';

export default function UserProfile(): JSX.Element {
  const { userData } = useAppSelector(apiAuthSelector);
  const customer = userData?.customer;

  const inputArrayPersonal: InputProfileType[] = [
    {
      title: 'First name',
      id: 'first-name',
      isSizeSmall: true,
      type: 'text',
      value: customer?.firstName || 'name',
    },
    {
      title: 'Last name',
      id: 'last-name',
      isSizeSmall: true,
      type: 'text',
      value: customer?.lastName || 'name',
    },
    {
      title: 'Date of birth',
      id: 'date-of-birth',
      isSizeSmall: false,
      type: 'data',
      value: customer?.dateOfBirth || '1900-01-01',
    },
  ];

  const inputArrayShippingAddress: InputProfileType[] = [
    {
      title: 'Country',
      id: 'country-ship',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[0]?.country || '',
    },
    {
      title: 'Post code',
      id: 'post-code-ship',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[0]?.postalCode || '000000',
    },
    {
      title: 'City',
      id: 'city-ship',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[0]?.city || 'city',
    },
    {
      title: 'Street',
      id: 'street-ship',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[0]?.streetName || 'street',
    },
  ];

  const inputArrayBillingAddress: InputProfileType[] = [
    {
      title: 'Country',
      id: 'country-billing',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[1]?.country || '',
    },
    {
      title: 'Post code',
      id: 'post-code-billing',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[1]?.postalCode || '000000',
    },
    {
      title: 'City',
      id: 'city-billing',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[1]?.city || 'city',
    },
    {
      title: 'Street',
      id: 'street-billing',
      isSizeSmall: true,
      type: 'text',
      value: customer?.addresses[1]?.streetName || 'street',
    },
  ];

  const ProfileUsersComponents: ProfileComponentType[] = [
    {
      title: 'Personal information',
      inputArray: inputArrayPersonal,
    },
    {
      title: 'Address information',
      subtitle: 'Shipping address',
      defaultAddress: true,
      inputArray: inputArrayShippingAddress,
    },
    {
      subtitle: 'Billing address',
      defaultAddress: false,
      inputArray: inputArrayBillingAddress,
    },
  ];

  return (
    <div className={classes['profile']}>
      <div className={classes['profile__column']}>
        {ProfileUsersComponents.map((item, index) => (
          <ProfileComponent
            title={item.title}
            subtitle={item.subtitle}
            inputArray={item.inputArray}
            defaultAddress={item.defaultAddress}
            key={item.title || item.subtitle || `address${index}`}
          />
        ))}
      </div>
      <div className={classes['profile__column']}>
        <div>Change password</div>
      </div>
    </div>
  );
}
