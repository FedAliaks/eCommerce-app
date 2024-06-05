import classes from './inputDefault.module.css';

export type InputDefaultType = {
  title: string;
  errorContent: string;
  htmlFor: string;
  type: string;
  smallSize: boolean;
  isActive: boolean;
  placeholder: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputDefault(props: InputDefaultType) {
  const { htmlFor, title, type, smallSize, isActive, placeholder, errorContent, handler } = props;

  return (
    <div>
      <p className={classes['input__title']}>{title}</p>
      <label htmlFor={htmlFor}>
        <div className={classes['input__block']}>
          <input
            className={
              smallSize ? `${classes['input']} ${classes['input__field_small']}` : classes['input']
            }
            id={htmlFor}
            type={type}
            disabled={!isActive}
            placeholder={placeholder}
            onChange={(e) => handler(e)}
          />
        </div>
      </label>
      <p className={classes['input__error']}>{errorContent}</p>
    </div>
  );
}
