import ProfileComponent from 'components/profile-component/profileComponent';
import { InputProfileType } from 'components/profile-component/types';
import { useState } from 'react';
import classes from './ChangePassword.module.css';
import ButtonProfile from '../button-profile/ButtonProfile';

export default function ChangePassword() {
  const [, setCurrenPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const checkCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('check current password');
    console.log(e.target.value);
    setCurrenPass(e.target.value);
  };

  const checkNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    console.log('check new password');
    console.log(e.target.value);
    setNewPass(e.target.value);
    setErrorMessage(e.target.value);
  };

  const checkEqualNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    console.log('check equaly password');
    setErrorMessage(e.target.value);
    if (e.target.value === newPass) {
      console.log('yes');
    } else {
      console.log('no');
    }
  };

  const inputArrayPassword: InputProfileType[] = [
    {
      title: 'Current password',
      id: 'current-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      handler: (e: React.ChangeEvent<HTMLInputElement>) => checkCurrentPassword(e),
    },
    {
      title: 'New password',
      id: 'new-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      handler: (
        e: React.ChangeEvent<HTMLInputElement>,
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
      ) => checkNewPassword(e, setErrorMessage),
    },
    {
      title: 'Confirm password',
      id: 'confirm-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      handler: (
        e: React.ChangeEvent<HTMLInputElement>,
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
      ) => checkEqualNewPassword(e, setErrorMessage),
    },
  ];

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
