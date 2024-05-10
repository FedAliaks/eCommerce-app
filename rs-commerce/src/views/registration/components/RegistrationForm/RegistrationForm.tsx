import AddressComponent from './components/AddressComponents/AddressComponents';
import ButtonRegistration from './components/ButtonRegistration/ButtonRegistration';
import InputRegistration from './components/InputRegistration/InputRegistration';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  return (
    <form action="#">
      <div className={classes['registration-form__wrapper']}>
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

        <div className={classes['form__column']}>
          <div className={classes['billing__container']}>
            <div className={classes['registration__subtitle-block']}>
              <h2 className={classes['registration__column-title']}>Address</h2>
              <label className={classes['input__label']} htmlFor="setSameAddress">
                <input className={classes['input_checkbox']} type="checkbox" id="setSameAddress" />
                <p className={classes['checkbox__content']}>
                  Set the same address as billing and shipping
                </p>
              </label>
            </div>

            <AddressComponent typeComponent="shipping" />

            <AddressComponent typeComponent="billing" />
          </div>
        </div>
      </div>
      <ButtonRegistration />
    </form>
  );
}

export default RegistrationForm;
