import classes from './styles.module.css';

export type InputProps = {
  input: {
    htmlFor: string;
    title: string;
    type: 'email' | 'password' | 'date' | 'text';
    placeholder: string;
    mistakeContent: string;
  };
};

function InputRegistration(props: InputProps) {
  const { input } = props;
  const { htmlFor, title, type, placeholder, mistakeContent } = input;
  return (
    <label htmlFor={htmlFor} className={classes['fieldForm']}>
      {' '}
      {title}
      <div>
        <input id={htmlFor} type={type} placeholder={placeholder} />
        <p className={classes['inputMistake']}>{mistakeContent}</p>
      </div>
    </label>
  );
}

export default InputRegistration;
