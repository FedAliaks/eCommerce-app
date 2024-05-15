import classes from './style.module.css';

export type CheckboxRegistrationType = {
  content: string;
  htmlFor: string;
};

function CheckboxRegistration(props: CheckboxRegistrationType) {
  const { content, htmlFor } = props;

  return (
    <label className={classes['input__label']} htmlFor={htmlFor}>
      <input className={classes['input_checkbox']} type="checkbox" id={htmlFor} />
      <p className={classes['checkbox__content']}>{content}</p>
    </label>
  );
}

export default CheckboxRegistration;
