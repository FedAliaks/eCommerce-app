import { useState } from 'react';
import { InputProps, TypeFields, DispatchObj } from 'types/registrationTypes';
import { useAppDispatch } from 'hooks/typed-react-redux-hooks';
import { registrationFormActions } from 'redux/slices/registration-slice';
import classes from './styles.module.css';
import { checkData, checkRegistrationField } from './utils/checkFields';

function InputRegistration(props: InputProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { input } = props;
  const { htmlFor, title, type, placeholder, smallSize } = input;
  let inputSize = classes['registration__input'];
  if (smallSize) {
    inputSize = `${classes['registration__input']} ${classes['registration__input_small']}`;
  }

  const [errorContent, setErrorContent] = useState('');

  function clearField(e: React.FocusEvent<HTMLInputElement, Element>) {
    console.log('focus');
    console.log(e.target);
    e.target.value = '';
    setErrorContent('');
  }

  function checkValue(e: React.FocusEvent<HTMLInputElement, Element>) {
    const target = e.target.value;

    if (htmlFor === 'dateOfBirth') {
      if (checkData(target, setErrorContent, htmlFor as TypeFields)) {
        dispatch(registrationFormActions[DispatchObj[htmlFor]](target));
      }
    } else if (checkRegistrationField(target, setErrorContent, htmlFor as TypeFields)) {
      dispatch(registrationFormActions[DispatchObj[htmlFor]](target));
    }
  }

  return (
    <div>
      <p className={classes['input__title']}>{title}</p>
      <label htmlFor={htmlFor}>
        <div className={classes['input__block']}>
          <input
            className={inputSize}
            id={htmlFor}
            type={type}
            placeholder={placeholder}
            onBlur={(e) => checkValue(e)}
            onFocus={(e) => clearField(e)}
          />
        </div>
      </label>
      <p className={classes['input__error']}>{errorContent}</p>
    </div>
  );
}

export default InputRegistration;
