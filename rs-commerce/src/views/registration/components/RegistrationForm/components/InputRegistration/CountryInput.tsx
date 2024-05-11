import { AddressType } from '../AddressRegistration/components/AddressComponents/components/AddresTitleComponent/AddresTitleComponent';
import classes from './styles.module.css';
import { registrationParamsObj } from './utils/checkFields';

type TypeCountry = 'shippingCountry' | 'billingCountry';

function CountryInput(props: AddressType): JSX.Element {
  const { typeComponent } = props;
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    const field = `${typeComponent}Country` as TypeCountry;
    registrationParamsObj[field] = e.target.value;
  }

  return (
    <label htmlFor={`${typeComponent}Country`}>
      <p className={classes['input__title']}>Country</p>
      <div className={classes['input__block']}>
        <input
          id={`${typeComponent}Country`}
          className={`${classes['registration__input']} ${classes['registration__input_small']}`}
          onChange={(e) => getValue(e)}
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
