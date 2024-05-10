import ButtonRegistration from './components/ButtonRegistration/ButtonRegistration';
import classes from './style.module.css';

function RegistrationForm(): JSX.Element {
  return (
    <form action="#">
      <div className={classes['registration-form__wrapper']}>
        <div className={classes['form__column']}>
          <label htmlFor="email">
            <p className={classes['input__title']}>Email</p>
            <div className={classes['input__block']}>
              <input className={classes['registration__input']} id="email" type="email" />
              <p className={classes['input__error']}>error message</p>
            </div>
          </label>

          <label htmlFor="password">
            <p className={classes['input__title']}>Password</p>
            <div className={classes['input__block']}>
              <input className={classes['registration__input']} id="password" type="password" />
              <p className={classes['input__error']}>error message</p>
            </div>
          </label>

          <label htmlFor="firstName">
            <p className={classes['input__title']}>First name</p>
            <div className={classes['input__block']}>
              <input className={classes['registration__input']} id="firstName" type="text" />
              <p className={classes['input__error']}>error message</p>
            </div>
          </label>

          <label htmlFor="lastName">
            <p className={classes['input__title']}>Last name</p>
            <div className={classes['input__block']}>
              <input className={classes['registration__input']} id="lastName" type="text" />
              <p className={classes['input__error']}>error message</p>
            </div>
          </label>

          <label htmlFor="dateOfBirth">
            <p className={classes['input__title']}>Date of birth</p>
            <div className={classes['input__block']}>
              <input className={classes['registration__input']} id="dateOfBirth" type="text" />
              <p className={classes['input__error']}>error message</p>
            </div>
          </label>
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
            <div className={classes['registration__address-container']}>
              <div className={classes['address__title-block']}>
                <h3 className={classes['address__subtitle']}>Shipping address</h3>
                <label className={classes['input__label']} htmlFor="setShippingDefaultAddress">
                  <input
                    className={classes['input_checkbox']}
                    type="checkbox"
                    id="setShippingDefaultAddress"
                  />
                  <p className={classes['checkbox__content']}>Set as a default address</p>
                </label>
              </div>

              <div className={classes['address']}>
                <label htmlFor="shipCountry">
                  <p className={classes['input__title']}>Country</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="shipCountry"
                      list="country"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>

                <datalist id="country">
                  <option value="USA" aria-label="USA" />
                  <option value="Belarus" aria-label="Belarus" />
                </datalist>

                <label htmlFor="shipPostCode">
                  <p className={classes['input__title']}>Post code</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="shipPostCode"
                      type="text"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>

                <label htmlFor="shipCity">
                  <p className={classes['input__title']}>City</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="shipCity"
                      type="text"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>

                <label htmlFor="shipStreet">
                  <p className={classes['input__title']}>Street</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="shipStreet"
                      type="text"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>
              </div>
            </div>

            <div className={classes['registration__address-container']}>
              <div className={classes['address__title-block']}>
                <h3 className={classes['address__subtitle']}>Billing address</h3>
                <label className={classes['input__label']} htmlFor="setBillingDefaultAddress">
                  <input
                    className={classes['input_checkbox']}
                    type="checkbox"
                    id="setBillingDefaultAddress"
                  />
                  <p className={classes['checkbox__content']}>Set as a default address</p>
                </label>
              </div>

              <div className={classes['address']}>
                <label htmlFor="billingCountry">
                  <p className={classes['input__title']}>Country</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="billingCountry"
                      list="country"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>

                <label htmlFor="billingPostCode">
                  <p className={classes['input__title']}>Post code</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="billingPostCode"
                      type="text"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>

                <label htmlFor="billingCity">
                  <p className={classes['input__title']}>City</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="billingCity"
                      type="text"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>

                <label htmlFor="billingStreet">
                  <p className={classes['input__title']}>Street</p>
                  <div className={classes['input__block']}>
                    <input
                      className={classes['registration__input registration__input_small']}
                      id="billingStreet"
                      type="text"
                    />
                    <p className={classes['input__error']}>error message</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ButtonRegistration />
    </form>
  );
}

export default RegistrationForm;
