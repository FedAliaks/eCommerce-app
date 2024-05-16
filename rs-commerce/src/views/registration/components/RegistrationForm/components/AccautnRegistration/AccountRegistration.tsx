import InputRegistration from '../InputRegistration/InputRegistration';
import classes from './style.module.css';

export type InputType = {
  htmlFor: string;
  title: string;
  type: 'email' | 'password' | 'text' | 'date';
  placeholder: string;
  smallSize?: boolean;
};

const inputFieldsArray: InputType[] = [
  {
    htmlFor: 'email',
    title: 'Email:',
    type: 'email',
    placeholder: 'your email',
  },
  {
    htmlFor: 'password',
    title: 'Password:',
    type: 'password',
    placeholder: 'your password',
  },
  {
    htmlFor: 'firstName',
    title: 'First name:',
    type: 'text',
    placeholder: 'your name',
  },
  {
    htmlFor: 'lastName',
    title: 'Last name:',
    type: 'text',
    placeholder: 'your last name',
  },
  {
    htmlFor: 'dateOfBirth',
    title: 'Date of birth:',
    type: 'date',
    placeholder: '',
  },
];

function AccountRegistration() {
  return (
    <div className={classes['form__column']}>
      {inputFieldsArray.map((item: InputType) => (
        <InputRegistration
          input={{
            htmlFor: item.htmlFor,
            title: item.title,
            type: item.type,
            placeholder: item.placeholder,
          }}
        />
      ))}
    </div>
  );
}

export default AccountRegistration;
