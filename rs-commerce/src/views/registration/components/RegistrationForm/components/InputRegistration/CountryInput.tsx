import { AddressType, TypeCountry, DispatchObj } from 'types/registrationTypes';
import { registrationFormActions } from 'redux/slices/registration-slice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { registrationFormSelector } from 'redux/selectors';
import classes from './styles.module.css';

const countryArr = ['US', 'BY'];

function CountryInput(props: AddressType): JSX.Element {
  const { sameAddressForShippingAndBilling } = useAppSelector(registrationFormSelector);

  const dispatch = useDispatch();
  const { typeComponent } = props;
  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    const field = `${typeComponent}Country` as TypeCountry;
    dispatch(registrationFormActions[DispatchObj[field]](e.target.value));

    if (sameAddressForShippingAndBilling) {
      dispatch(registrationFormActions.setBillingCountry(e.target.value));
    }
  }

  function clearInput(e: React.FocusEvent<HTMLInputElement, Element>): void {
    e.target.value = '';
  }

  const addDisabled = (htmlFor: string): boolean =>
    sameAddressForShippingAndBilling && htmlFor.startsWith('billing');

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
            disabled={addDisabled(typeComponent)}
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
