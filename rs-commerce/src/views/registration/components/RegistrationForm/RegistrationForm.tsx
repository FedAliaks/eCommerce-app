import ButtonBig from 'components/button-big/button-big';
import { apiRegistrationActions } from 'redux/slices/api-registration-slice';
import { useAppDispatch } from 'hooks/typed-react-redux-hooks';
import AccountRegistration from './components/AccautnRegistration/AccountRegistration';
import AddressRegistration from './components/AddressRegistration/AddressRegistration';
import { registrationParamsObj } from './components/InputRegistration/utils/checkFields';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const ButtonRegistrationClick = (): void => {
    const tempData = {
      email: registrationParamsObj.email,
      password: registrationParamsObj.password,
    };
    dispatch(apiRegistrationActions.startRegistration({ data: tempData }));
    console.log('start regustration');
  };

  const isActiveStyle = (): boolean => false;

  return (
    <form action="#">
      <div className={classes['registration-form__wrapper']}>
        <AccountRegistration />
        <AddressRegistration />
      </div>
      <ButtonBig
        isActiveStyle={isActiveStyle()}
        content="Registration"
        onClick={ButtonRegistrationClick}
      />
    </form>
  );
}

export default RegistrationForm;
