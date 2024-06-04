import classes from './checkboxDefault.module.css';

type CheckboxDefaultType = {
  content: string;
  idCheckbox?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckboxDefault(props: CheckboxDefaultType): JSX.Element {
  const { idCheckbox, onChange, content } = props;

  return (
    <div className={classes['checkbox-container']}>
      <input
        className={classes['input_checkbox']}
        onChange={onChange}
        type="checkbox"
        id={idCheckbox}
      />

      <label className={classes['input__label']} htmlFor={idCheckbox}>
        {content}
      </label>
    </div>
  );
}
