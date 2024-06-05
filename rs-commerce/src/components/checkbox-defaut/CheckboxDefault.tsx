import classes from './checkboxDefault.module.css';

type CheckboxDefaultType = {
  content: string;
  idCheckbox?: string;
  isChecked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckboxDefault(props: CheckboxDefaultType): JSX.Element {
  const { idCheckbox, onChange, content, isChecked } = props;

  return (
    <div className={classes['checkbox-container']}>
      <input
        className={classes['input_checkbox']}
        onChange={onChange}
        type="checkbox"
        id={idCheckbox}
        checked={isChecked || false}
      />

      <label className={classes['input__label']} htmlFor={idCheckbox}>
        {content}
      </label>
    </div>
  );
}
