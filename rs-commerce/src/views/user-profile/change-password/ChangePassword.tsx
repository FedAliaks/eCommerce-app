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
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { ROUTE_PATH } from 'constants/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from '../UserProfile.module.css';
import { changePasswordBreadcrumbList } from '../constants';

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [currentPassError, setCurrentPassError] = useState('');
  const [newPassError, setNewPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const { newPassword } = useAppSelector(updateProfileSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCurrentPass(value);
    if (value.length < 1) {
      dispatch(updateProfileActions.setCheckNewPassword(false));
    } else if (newPass === confirmPass && regExpObj.password.test(newPass)) {
      dispatch(updateProfileActions.setCheckNewPassword(true));
    }
    setCurrentPassError('');
  };

  const checkNewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    apiRootWithExistingTokenFlow()
      .me()
      .get()
      .execute()
      .then((res) => {
        apiRootWithExistingTokenFlow()
          .customers()
          .password()
          .post({
            body: {
              id: res.body.id,
              version: res.body.version,
              currentPassword: currentPass,
              newPassword: newPass,
            },
          })
          .execute()
          .then(() => {
            toast.success('Password has changed. Entry in your profile again');
            dispatch(apiAuthActions.setIsAuth(false));
            navigate(ROUTE_PATH.login);
          })
          .catch(() => {
            setCurrentPassError('Check your current password');
          });
      })
      .catch(() => {
        setCurrentPassError('New and old passwords are equal');
      });
  };

  const clearFieldsOnPage = () => {
    navigate(ROUTE_PATH.profile);
  };

  return (
    <div>
      <Breadcrumb linksList={changePasswordBreadcrumbList} currentPageName="Change password" />

      <div className={`container ${classes['profile']}`}>
        <div className={classes['profile__column']}>
          <ProfileComponent inputArray={inputArrayPassword} flexVertical />
          <div className={classes['profile__password-btn-container']}>
            <ButtonProfile content="Cancel" colored={false} onClick={clearFieldsOnPage} />
            <ButtonProfile page="password" content="Save" colored onClick={saveBtnClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
