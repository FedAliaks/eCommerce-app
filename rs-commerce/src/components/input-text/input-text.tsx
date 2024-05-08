import { InputProps } from 'types/types';
import style from './style.module.css';

function InputText(props: InputProps): JSX.Element {
  const { nameWrapper, namePlaceholder, inputValue, onChange, inputTips } = props;

  return (
    <div className={style['input-wrapper']}>
      <div className={style['input-field-name']}>{nameWrapper}</div>
      <input
        className={style['input-field']}
        id="login-email"
        placeholder={namePlaceholder}
        value={inputValue}
        onChange={onChange}
      />
      <div className={style['input-field-tips']}>{inputTips}</div>
    </div>
  );
}

export default InputText;
