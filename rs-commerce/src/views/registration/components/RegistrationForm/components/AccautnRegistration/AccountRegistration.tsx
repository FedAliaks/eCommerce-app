import InputRegistration from '../InputRegistration/InputRegistration';
import classes from './style.module.css';

function AccountRegistration() {
  return (
    <div className={classes['form__column']}>
      <InputRegistration
        input={{
          htmlFor: 'email',
          title: 'Email:',
          type: 'email',
          placeholder: 'your email',
          mistakeContent: 'error message',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'password',
          title: 'Password:',
          type: 'password',
          placeholder: 'your password',
          mistakeContent: 'error message',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'firstName',
          title: 'First name:',
          type: 'text',
          placeholder: 'your name',
          mistakeContent: 'error message',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'lastName',
          title: 'Last name:',
          type: 'text',
          placeholder: 'your last name',
          mistakeContent: 'error message',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'dateOfBirth',
          title: 'Date of birth:',
          type: 'date',
          placeholder: '',
          mistakeContent: 'error message',
        }}
      />
    </div>
  );
}

export default AccountRegistration;
