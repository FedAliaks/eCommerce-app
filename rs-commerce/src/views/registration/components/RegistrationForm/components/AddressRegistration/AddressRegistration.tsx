import AddressComponent from './components/AddressComponents/AddressComponents';
import classes from './style.module.css';

function AddressRegistration() {
  return (
    <div className={classes['form__column']}>
      <div className={classes['billing__container']}>
        <div className={classes['registration__subtitle-block']}>
          <h2 className={classes['registration__column-title']}>Address</h2>
          <label className={classes['input__label']} htmlFor="setSameAddress">
            <input className={classes['input_checkbox']} type="checkbox" id="setSameAddress" />
            <p className={classes['checkbox__content']}>One address for billing and shipping.</p>
          </label>
        </div>

        <AddressComponent typeComponent="shipping" />

        <AddressComponent typeComponent="billing" />
      </div>
    </div>
  );
}

export default AddressRegistration;
