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
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'password',
          title: 'Password:',
          type: 'password',
          placeholder: 'your password',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'firstName',
          title: 'First name:',
          type: 'text',
          placeholder: 'your name',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'lastName',
          title: 'Last name:',
          type: 'text',
          placeholder: 'your last name',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'dateOfBirth',
          title: 'Date of birth:',
          type: 'date',
          placeholder: '',
        }}
      />
    </div>
  );
}

export default AccountRegistration;
