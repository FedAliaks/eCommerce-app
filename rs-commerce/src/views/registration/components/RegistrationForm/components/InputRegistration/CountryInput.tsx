import { AddressType, TypeCountry, DispatchObj } from 'types/registrationTypes';
import { registrationFormActions } from 'redux/slices/registration-slice';
import { useDispatch } from 'react-redux';
import classes from './styles.module.css';

const countryArr = ['USA', 'Belarus'];

function CountryInput(props: AddressType): JSX.Element {
  const dispatch = useDispatch();
  const { typeComponent } = props;
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    const field = `${typeComponent}Country` as TypeCountry;
    dispatch(registrationFormActions[DispatchObj[field]](e.target.value));
  }

  function clearInput(e: React.FocusEvent<HTMLInputElement, Element>): void {
    e.target.value = '';
  }

  return (
    <div>
      <p className={classes['input__title']}>Country</p>
      <label htmlFor={`${typeComponent}Country`}>
        <div className={classes['input__block']}>
          <input
            id={`${typeComponent}Country`}
            className={`${classes['registration__input']} ${classes['registration__input_small']}`}
            onChange={(e) => getValue(e)}
            onFocus={(e) => clearInput(e)}
            list="country"
            placeholder="Choose your country"
          />
          <datalist id="country">
            {countryArr.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </datalist>
        </div>
      </label>
    </div>
  );
}

export default CountryInput;
