import ProfileComponent from 'components/profile-component/profileComponent';
import { InputProfileType } from 'components/profile-component/types';
import classes from './ChangePassword.module.css';
import ButtonProfile from '../button-profile/ButtonProfile';

function checkCurrentPassword(): void {
  console.log('check current password');
}

function checkNewPassword(): void {
  console.log('check new password');
}

function checkEqualNewPassword(): void {
  console.log('check equaly password');
}

const inputArrayPassword: InputProfileType[] = [
  {
    title: 'Current password',
    id: 'current-password',
    isSizeSmall: false,
    type: 'password',
    isDisabled: false,
    handler: () => checkCurrentPassword(),
  },
  {
    title: 'New password',
    id: 'new-password',
    isSizeSmall: false,
    type: 'password',
    isDisabled: false,
    handler: () => checkNewPassword(),
  },
  {
    title: 'Confirm password',
    id: 'confirm-password',
    isSizeSmall: false,
    type: 'password',
    isDisabled: false,
    handler: () => checkEqualNewPassword(),
  },
];

export default function ChangePassword() {
  return (
    <div className={classes['profile']}>
      <div className={classes['profile__column']}>
        <ProfileComponent inputArray={inputArrayPassword} flexVertical />
        <div className={classes['profile__password-btn-container']}>
          <ButtonProfile content="Cancel" colored={false} />
          <ButtonProfile content="Save" colored />
        </div>
      </div>
    </div>
  );
}
