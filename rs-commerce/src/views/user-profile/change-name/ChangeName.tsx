import { InputProfileType } from 'components/profile-component/types';
import ProfileComponent from 'components/profile-component/profileComponent';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import ButtonProfile from '../button-profile/ButtonProfile';
import classes from './changeName.module.css';

export default function ChangeName(): JSX.Element {
  const { userData } = useAppSelector(apiAuthSelector);
  const customer = userData?.customer;

  const checkField = () => {
    console.log('check');
  };

  const inputArrayAddress: InputProfileType[] = [
    {
      title: 'First name',
      id: 'first-name',
      isSizeSmall: false,
      type: 'text',
      isDisabled: false,
      errorMsg: 'error',
      value: customer?.firstName,
      handler: checkField,
    },
    {
      title: 'Last name',
      id: 'last-name',
      isSizeSmall: false,
      type: 'text',
      isDisabled: false,
      errorMsg: 'error',
      value: customer?.lastName,
      handler: checkField,
    },
    {
      title: 'Date of birth',
      id: 'date-of-birth',
      isSizeSmall: false,
      type: 'data',
      isDisabled: false,
      value: customer?.dateOfBirth,
      errorMsg: 'error',
      handler: checkField,
    },
    {
      title: 'Email',
      id: 'email',
      isSizeSmall: false,
      type: 'email',
      isDisabled: false,
      value: customer?.email,
      errorMsg: 'error',
      handler: checkField,
    },
  ];

  const clearFieldsOnPage = (): void => {
    console.log('clear');
  };

  const saveBtnClick = (): void => {
    console.log('save parameters');
  };

  return (
    <div className={classes['profile']}>
      <div className={classes['profile__column']}>
        <h1>Personal information</h1>
        <ProfileComponent inputArray={inputArrayAddress} flexVertical />
        <div className={classes['profile__password-btn-container']}>
          <ButtonProfile content="Cancel" colored={false} onClick={clearFieldsOnPage} />
          <ButtonProfile content="Save" colored onClick={saveBtnClick} />
        </div>
      </div>
    </div>
  );
}
