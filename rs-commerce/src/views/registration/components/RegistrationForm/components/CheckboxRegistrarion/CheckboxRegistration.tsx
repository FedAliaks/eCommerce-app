import { CheckboxRegistrationType } from 'types/registrationTypes';
import classes from './style.module.css';

function CheckboxRegistration(props: CheckboxRegistrationType): JSX.Element {
  const { content, htmlFor } = props;

  return (
    <label className={classes['input__label']} htmlFor={htmlFor}>
      <input className={classes['input_checkbox']} type="checkbox" id={htmlFor} />
      <p className={classes['checkbox__content']}>{content}</p>
    </label>
  );
}

export default CheckboxRegistration;
