import classes from './styles.module.css';

export type InputProps = {
  input: {
    htmlFor: string;
    title: string;
    type: 'email' | 'password' | 'date' | 'text';
    placeholder: string;
    mistakeContent: string;
    smallSize?: boolean;
  };
};

function InputRegistration(props: InputProps) {
  const { input } = props;
  const { htmlFor, title, type, placeholder, mistakeContent, smallSize } = input;
  let inputSize = classes['registration__input'];
  if (smallSize) {
    inputSize = `${classes['registration__input']} ${classes['registration__input_small']}`;
  }
  return (
    <label htmlFor={htmlFor}>
      <p className={classes['input__title']}>{title}</p>
      <div className={classes['input__block']}>
        <input className={inputSize} id={htmlFor} type={type} placeholder={placeholder} />
        <p className={classes['input__error']}>{mistakeContent}</p>
      </div>
    </label>
  );
}

export default InputRegistration;
