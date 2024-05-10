import { AddressType } from '../AddressRegistration/components/AddressComponents/components/AddresTitleComponent/AddresTitleComponent';
import classes from './styles.module.css';

function CountryInput(props: AddressType): JSX.Element {
  const { typeComponent } = props;
  return (
    <label htmlFor={`${typeComponent}Country`}>
      <p className={classes['input__title']}>Country</p>
      <div className={classes['input__block']}>
        <input
          id={`${typeComponent}Country`}
          className={`${classes['registration__input']} ${classes['registration__input_small']}`}
          list="country"
        />
        <datalist id="country">
          <option>USA</option>
          <option>Belarus</option>
        </datalist>
      </div>
    </label>
  );
}

export default CountryInput;
