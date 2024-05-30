import ProfileComponent from 'components/profile-component/profileComponent';
import { InputProfileType } from 'components/profile-component/types';
import { useState } from 'react';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { updateProfileSelector, apiAuthSelector } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { updateProfileActions } from 'redux/slices/update-profile-slice';
import {
  errorMsgObj,
  regExpObj,
} from 'views/registration/components/RegistrationForm/components/InputRegistration/utils/checkFields';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from './ChangePassword.module.css';

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [currentPassError, setCurrentPassError] = useState('');
  const [newPassError, setNewPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const { newPassword } = useAppSelector(updateProfileSelector);
  const { userData } = useAppSelector(apiAuthSelector);
  const dispatch = useDispatch();

  const checkCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('check current password');
    const { value } = e.target;
    setCurrentPass(value);
    if (value.length < 1) {
      dispatch(updateProfileActions.setCheckNewPassword(false));
    } else if (newPass === confirmPass && regExpObj.password.test(newPass)) {
      dispatch(updateProfileActions.setCheckNewPassword(true));
    }
  };

  const checkNewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('check new password');
    const { value } = e.target;
    setNewPass(value);

    if (!regExpObj.password.test(value)) {
      setNewPassError(errorMsgObj.password);
    } else {
      dispatch(updateProfileActions.setNewPassword(value));
      setNewPassError('');
      if (value === confirmPass) dispatch(updateProfileActions.setCheckNewPassword(true));
    }
    if (value !== confirmPass) dispatch(updateProfileActions.setCheckNewPassword(false));
  };

  const checkEqualNewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('check equaly password');

    const { value } = e.target;
    setConfirmPass(value);

    if (value === newPassword) {
      dispatch(updateProfileActions.setCheckNewPassword(true));
      setConfirmPassError('');
    } else {
      setConfirmPassError(errorMsgObj.checkNewPassword);
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
      errorMsg: currentPassError,
      value: currentPass,
      handler: (e: React.ChangeEvent<HTMLInputElement>) => checkCurrentPassword(e),
    },
    {
      title: 'New password',
      id: 'new-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      errorMsg: newPassError,
      value: newPass,
      handler: (e: React.ChangeEvent<HTMLInputElement>) => checkNewPassword(e),
    },
    {
      title: 'Confirm password',
      id: 'confirm-password',
      isSizeSmall: false,
      type: 'password',
      isDisabled: false,
      value: confirmPass,
      errorMsg: confirmPassError,
      handler: (e: React.ChangeEvent<HTMLInputElement>) => checkEqualNewPassword(e),
    },
  ];

  const saveBtnClick = () => {
    console.log('change password');
    if (userData) {
      apiRootWithExistingTokenFlow()
        .customers()
        .password()
        .post({
          body: {
            id: userData?.customer?.id,
            version: userData.customer.version,
            currentPassword: currentPass,
            newPassword: newPass,
          },
        })
        .execute()
        .then((value) => console.log(value))
        .catch(() => setCurrentPassError('Check your current password'));
    }
  };

  const clearFieldsOnPage = () => {
    console.log('clear fields');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setNewPassError('');
    setConfirmPassError('');
    dispatch(updateProfileActions.setCheckNewPassword(false));
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
