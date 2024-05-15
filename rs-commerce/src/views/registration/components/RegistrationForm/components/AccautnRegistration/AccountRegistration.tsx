import InputRegistration from '../InputRegistration/InputRegistration';
import classes from './style.module.css';

const inputFieldsArray = [
  <InputRegistration
    input={{
      htmlFor: 'email',
      title: 'Email:',
      type: 'email',
      placeholder: 'your email',
    }}
  />,
  <InputRegistration
    input={{
      htmlFor: 'password',
      title: 'Password:',
      type: 'password',
      placeholder: 'your password',
    }}
  />,
  <InputRegistration
    input={{
      htmlFor: 'firstName',
      title: 'First name:',
      type: 'text',
      placeholder: 'your name',
    }}
  />,
  <InputRegistration
    input={{
      htmlFor: 'lastName',
      title: 'Last name:',
      type: 'text',
      placeholder: 'your last name',
    }}
  />,
  <InputRegistration
    input={{
      htmlFor: 'dateOfBirth',
      title: 'Date of birth:',
      type: 'date',
      placeholder: '',
    }}
  />,
];

function AccountRegistration() {
  return <div className={classes['form__column']}>{inputFieldsArray.map((item) => item)}</div>;
}

export default AccountRegistration;
