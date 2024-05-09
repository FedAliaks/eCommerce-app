import ButtonRegistration from './components/ButtonRegistration/ButtonRegistration';
import CountryInput from './components/InputRegistration/CountryInput';
import InputRegistration from './components/InputRegistration/InputRegistration';

function RegistrationForm(): JSX.Element {
  return (
    <form>
      <InputRegistration
        input={{
          htmlFor: 'email',
          title: 'Email:',
          type: 'email',
          placeholder: 'Your email',
          mistakeContent: 'Input correct email',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'password',
          title: 'Password:',
          type: 'password',
          placeholder: 'Your password',
          mistakeContent: 'Use at least 8 characters',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'name',
          title: 'Name:',
          type: 'text',
          placeholder: 'Your name',
          mistakeContent: 'Use at least 1 character',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'surname',
          title: 'Surname:',
          type: 'text',
          placeholder: 'Your surname',
          mistakeContent: 'Use at least 1 character',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'birthday',
          title: 'Date of birth:',
          type: 'text',
          placeholder: 'Your date of birth',
          mistakeContent: 'You must be over 13 years old',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'address',
          title: 'Address:',
          type: 'text',
          placeholder: 'Your address',
          mistakeContent: 'Use at least 1 character',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'city',
          title: 'City:',
          type: 'text',
          placeholder: 'Your city',
          mistakeContent: 'Use at least 1 character',
        }}
      />
      <InputRegistration
        input={{
          htmlFor: 'postIndex',
          title: 'PostIndex:',
          type: 'text',
          placeholder: 'Your post index',
          mistakeContent: 'Use correct post index',
        }}
      />
      <CountryInput />

      <ButtonRegistration />
    </form>
  );
}

export default RegistrationForm;
