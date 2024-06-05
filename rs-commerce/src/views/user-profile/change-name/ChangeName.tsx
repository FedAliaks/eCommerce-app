import { InputProfileType } from 'components/profile-component/types';
import ProfileComponent from 'components/profile-component/profileComponent';
import { useEffect, useState } from 'react';
import {
  errorMsgObj,
  regExpObj,
} from 'views/registration/components/RegistrationForm/components/InputRegistration/utils/checkFields';
import { useDispatch } from 'react-redux';
import { updateProfileActions } from 'redux/slices/update-profile-slice';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from '../UserProfile.module.css';
import UserProfileHeader from '../user-profile-header/UserProfileHeader';

export default function ChangeName(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('first-name');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('last-name');
  const [lastNameError, setLastNameError] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [email, setEmail] = useState('example@mail.com');
  const [emailError, setEmailError] = useState('');
  const [customMsg, setCustomMsg] = useState('');

  const getNameFromServer = () => {
    apiRootWithExistingTokenFlow()
      .me()
      .get()
      .execute()
      .then((res) => {
        apiRootWithExistingTokenFlow()
          .customers()
          .withId({ ID: res.body.id })
          .get()
          .execute()
          .then((res1) => {
            setFirstName(res1.body.firstName || 'name');
            setLastName(res1.body.lastName || 'last - name');
            setDateOfBirth(res1.body.dateOfBirth || '2000-01-01');
            setEmail(res1.body.email || 'example@mail.com');
          });
      });
  };

  useEffect(() => {
    getNameFromServer();
  }, []);

  const checkField = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    regExp: RegExp,
    errorMsg: string,
  ) => {
    setCustomMsg('');
    const { value } = e.target;
    setState(value);
    if (errorMsg !== errorMsgObj.dateOfBirth) {
      if (regExp.test(value)) {
        setError('');
        if (!firstNameError && !lastNameError && !emailError && !dateOfBirthError)
          dispatch(updateProfileActions.setCheckNewName(true));
      } else {
        setError(errorMsg);
        dispatch(updateProfileActions.setCheckNewName(false));
      }
    } else {
      const limitData = new Date();
      limitData.setFullYear(limitData.getFullYear() - 13);
      const birthdayData = new Date(value);
      if (birthdayData <= limitData) {
        setError('');
        if (!firstNameError && !lastNameError && !emailError && !dateOfBirthError)
          dispatch(updateProfileActions.setCheckNewName(true));
      } else {
        setError(errorMsg);
        dispatch(updateProfileActions.setCheckNewName(false));
      }
    }
  };

  const inputArrayAddress: InputProfileType[] = [
    {
      title: 'First name',
      id: 'first-name',
      isSizeSmall: false,
      type: 'text',
      isDisabled: false,
      errorMsg: firstNameError,
      value: firstName,
      handler: (e) =>
        checkField(e, setFirstName, setFirstNameError, regExpObj.firstName, errorMsgObj.firstName),
    },
    {
      title: 'Last name',
      id: 'last-name',
      isSizeSmall: false,
      type: 'text',
      isDisabled: false,
      errorMsg: lastNameError,
      value: lastName,
      handler: (e) =>
        checkField(e, setLastName, setLastNameError, regExpObj.lastName, errorMsgObj.lastName),
    },
    {
      title: 'Date of birth',
      id: 'date-of-birth',
      isSizeSmall: false,
      type: 'date',
      isDisabled: false,
      value: dateOfBirth,
      errorMsg: dateOfBirthError,
      handler: (e) =>
        checkField(
          e,
          setDateOfBirth,
          setDateOfBirthError,
          regExpObj.lastName,
          errorMsgObj.dateOfBirth,
        ),
    },
    {
      title: 'Email',
      id: 'email',
      isSizeSmall: false,
      type: 'email',
      isDisabled: false,
      value: email,
      errorMsg: emailError,
      handler: (e) => checkField(e, setEmail, setEmailError, regExpObj.email, errorMsgObj.email),
    },
  ];

  const clearFieldsOnPage = (): void => {
    navigate(ROUTE_PATH.profile);
  };

  const saveBtnClick = (): void => {
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
                  action: 'setFirstName',
                  firstName,
                },
                {
                  action: 'setLastName',
                  lastName,
                },
                {
                  action: 'setDateOfBirth',
                  dateOfBirth,
                },
                {
                  action: 'changeEmail',
                  email,
                },
              ],
            },
          })
          .execute()
          .then(() => {
            getNameFromServer();
            setCustomMsg('Your date have updated');
          });
      });
  };

  return (
    <div>
      <UserProfileHeader title="Change name" subtitle="Main > Profile > Edit name" />

      <div className={classes['profile']}>
        <div className={classes['profile__column']}>
          <h1>Personal information</h1>
          <ProfileComponent inputArray={inputArrayAddress} flexVertical />
          <p className={classes['custom-message']}>{customMsg}</p>
          <div className={classes['profile__password-btn-container']}>
            <ButtonProfile content="Cancel" colored={false} onClick={clearFieldsOnPage} />
            <ButtonProfile page="name" content="Save" colored onClick={saveBtnClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
