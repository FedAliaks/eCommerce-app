import ProfileComponent from 'components/profile-component/profileComponent';
import { InputProfileType } from 'components/profile-component/types';
import { useState } from 'react';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { updateProfileSelector } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { updateProfileActions } from 'redux/slices/update-profile-slice';
import {
  errorMsgObj,
  regExpObj,
} from 'views/registration/components/RegistrationForm/components/InputRegistration/utils/checkFields';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from './ChangePassword.module.css';

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const { newPassword } = useAppSelector(updateProfileSelector);
  const dispatch = useDispatch();

  const checkCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('check current password');
    const { value } = e.target;
    setCurrentPass(value);
  };

  const checkNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    console.log('check new password');
    const { value } = e.target;
    setNewPass(value);

    if (!regExpObj.password.test(value)) {
      setErrorMessage(errorMsgObj.password);
    } else {
      dispatch(updateProfileActions.setNewPassword(value));
      setErrorMessage('');
    }
  };

  const checkEqualNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    console.log('check equaly password');

    const { value } = e.target;
    setConfirmPass(value);

    if (value === newPassword) {
      setErrorMessage('');
      dispatch(updateProfileActions.setCheckNewPassword(true));
    } else {
      setErrorMessage(errorMsgObj.checkNewPassword);
      dispatch(updateProfileActions.setCheckNewPassword(false));
    }
  };

  const inputArrayPassword: InputProfileType[] = [
    {
      title: 'Current password',
      id: 'current-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      value: currentPass,
      handler: (e: React.ChangeEvent<HTMLInputElement>) => checkCurrentPassword(e),
    },
    {
      title: 'New password',
      id: 'new-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      value: newPass,
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
      value: confirmPass,
      handler: (
        e: React.ChangeEvent<HTMLInputElement>,
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
      ) => checkEqualNewPassword(e, setErrorMessage),
    },
  ];

  const saveBtnClick = () => {
    console.log('change password');
  };

  const clearFieldsOnPage = () => {
    console.log('clear fields');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className={classes['profile']}>
      <div className={classes['profile__column']}>
        <ProfileComponent inputArray={inputArrayPassword} flexVertical />
        <div className={classes['profile__password-btn-container']}>
          <ButtonProfile content="Cancel" colored={false} onClick={clearFieldsOnPage} />
          <ButtonProfile content="Save" colored onClick={saveBtnClick} />
        </div>
      </div>
    </div>
  );
}
