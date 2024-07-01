import {
  CheckboxRegistrationType,
  DispatchObj,
  HtmlForCheckboxType,
} from 'types/registrationTypes';
import { useDispatch } from 'react-redux';
import { registrationFormActions } from 'redux/slices/registration-slice';
import { registrationFormSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import classes from './style.module.css';

function CheckboxRegistration(props: CheckboxRegistrationType): JSX.Element {
  const { content, htmlFor } = props;
  const dispatch = useDispatch();

  const { sameAddressForShippingAndBilling, defaultBillingAddress, defaultShippingAddress } =
    useAppSelector(registrationFormSelector);

  function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(registrationFormActions[DispatchObj[htmlFor]](e.target.checked));

    if (htmlFor === 'setShippingDefaultAddress' && e.target.checked) {
      dispatch(registrationFormActions.setDefaultBillingAddress(false));
    }

    if (htmlFor === 'setBillingDefaultAddress' && e.target.checked) {
      dispatch(registrationFormActions.setDefaultShippingAddress(false));
    }
  }

  const isChecked = (htmlForValue: HtmlForCheckboxType): boolean => {
    if (htmlForValue === 'setBillingDefaultAddress') {
      if (defaultBillingAddress) {
        return true;
      }
      return false;
    }

    if (htmlForValue === 'setSameAddress') {
      if (sameAddressForShippingAndBilling) {
        return true;
      }
      return false;
    }

    if (htmlForValue === 'setShippingDefaultAddress') {
      if (defaultShippingAddress) {
        return true;
      }
      return false;
    }

    return false;
  };

  const addDisabled = (): boolean =>
    sameAddressForShippingAndBilling && htmlFor === 'setBillingDefaultAddress';

  return (
    <label className={classes['input__label']} htmlFor={htmlFor}>
      <input
        className={classes['input_checkbox']}
        onChange={(e) => toggleCheckbox(e)}
        type="checkbox"
        id={htmlFor}
        disabled={addDisabled()}
        checked={isChecked(htmlFor)}
      />
      <p className={classes['checkbox__content']}>{content}</p>
    </label>
  );
}

export default CheckboxRegistration;
