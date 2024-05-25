import ProfileComponent from 'components/profile-component/profileComponent';
import {
  inputArrayBillingAddress,
  inputArrayPersonal,
  inputArrayShippingAddress,
} from './elements';
import classes from './UserProfile.module.css';

export default function UserProfile(): JSX.Element {
  return (
    <div className={classes['profile']}>
      <div className={classes['profile__column']}>
        <ProfileComponent title="Personal information" inputArray={inputArrayPersonal} />
        <ProfileComponent
          title="Address information"
          subtitle="Shipping address"
          defaultAddress
          inputArray={inputArrayShippingAddress}
        />
        <ProfileComponent
          subtitle="Billing address"
          defaultAddress={false}
          inputArray={inputArrayBillingAddress}
        />
      </div>
      <div className={classes['profile__column']}>
        <div>Change password</div>
      </div>
    </div>
  );
}
