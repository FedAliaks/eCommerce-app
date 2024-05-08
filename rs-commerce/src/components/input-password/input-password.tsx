import { InputProps } from 'types/types';
import { useState } from 'react';
import style from './style.module.css';

function InputPassword(props: InputProps): JSX.Element {
  const { nameWrapper, namePlaceholder, inputValue, onChange, inputTips } = props;
  const [isOpenEye, setIsOpenEye] = useState(false);

  const eyeStyle = (): string =>
    isOpenEye ? `${style['password__eye']} ${style['eye-open']}` : `${style['password__eye']}`;

  const openEye = (): void => {
    setIsOpenEye(!isOpenEye);
  };

  const passwordType = (): string => (isOpenEye ? 'text' : 'password');

  return (
    <div className={style['input-wrapper']}>
      <div className={eyeStyle()} onClick={openEye} role="presentation" />
      <div className={style['input-field-name']}>{nameWrapper}</div>
      <input
        className={style['input-field']}
        type={passwordType()}
        placeholder={namePlaceholder}
        value={inputValue}
        onChange={onChange}
      />
      <div className={style['input-field-tips']}>{inputTips}</div>
    </div>
  );
}

export default InputPassword;
