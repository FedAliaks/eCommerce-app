import CheckboxRegistration from '../CheckboxRegistrarion/CheckboxRegistration';
import AddressComponent from './components/AddressComponents/AddressComponents';
import classes from './style.module.css';

function AddressRegistration() {
  return (
    <div className={classes['form__column']}>
      <div className={classes['billing__container']}>
        <div className={classes['registration__subtitle-block']}>
          <h2 className={classes['registration__column-title']}>Address</h2>
          <CheckboxRegistration
            content="One address for billing and shipping."
            htmlFor="setSameAddress"
          />
        </div>

        <AddressComponent typeComponent="shipping" />

        <AddressComponent typeComponent="billing" />
      </div>
    </div>
  );
}

export default AddressRegistration;
