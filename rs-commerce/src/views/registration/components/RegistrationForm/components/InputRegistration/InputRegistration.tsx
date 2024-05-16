import { useState } from 'react';
import { InputProps, TypeFields } from 'types/registrationTypes';
import classes from './styles.module.css';
import { checkData, checkRegistrationField } from './utils/checkFields';

function InputRegistration(props: InputProps): JSX.Element {
  const { input } = props;
  const { htmlFor, title, type, placeholder, smallSize } = input;
  let inputSize = classes['registration__input'];
  if (smallSize) {
    inputSize = `${classes['registration__input']} ${classes['registration__input_small']}`;
  }

  const [errorContent, setErrorContent] = useState('');

  function clearField(e: React.FocusEvent<HTMLInputElement, Element>) {
    e.target.value = '';
    setErrorContent('');
  }

  function checkValue(e: React.FocusEvent<HTMLInputElement, Element>) {
    const target = e.target.value;

    if (htmlFor === 'dateOfBirth') {
      checkData(target, setErrorContent, htmlFor as TypeFields);
    } else {
      checkRegistrationField(target, setErrorContent, htmlFor as TypeFields);
    }
  }

  return (
    <label htmlFor={htmlFor}>
      <p className={classes['input__title']}>{title}</p>
      <div className={classes['input__block']}>
        <input
          className={inputSize}
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          onBlur={(e) => checkValue(e)}
          onFocus={(e) => clearField(e)}
        />
        <p className={classes['input__error']}>{errorContent}</p>
      </div>
    </label>
  );
}

export default InputRegistration;
