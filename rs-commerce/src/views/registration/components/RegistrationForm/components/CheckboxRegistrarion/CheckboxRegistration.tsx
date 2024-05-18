import { CheckboxRegistrationType, DispatchObj } from 'types/registrationTypes';
import { useDispatch } from 'react-redux';
import { registrationFormActions } from 'redux/slices/registration-slice';
import { registrationFormSelector } from 'redux/selectors';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import classes from './style.module.css';

function CheckboxRegistration(props: CheckboxRegistrationType): JSX.Element {
  const { content, htmlFor } = props;
  const dispatch = useDispatch();

  const { sameAddressForShippingAndBilling } = useAppSelector(registrationFormSelector);

  function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(registrationFormActions[DispatchObj[htmlFor]](e.target.checked));
  }

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
      />
      <p className={classes['checkbox__content']}>{content}</p>
    </label>
  );
}

export default CheckboxRegistration;
