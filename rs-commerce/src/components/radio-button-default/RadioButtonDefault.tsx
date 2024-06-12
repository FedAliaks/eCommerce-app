import classes from './radioButtonDefault.module.css';

export type RadioButtonDefaultType = {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  valueForCheck: string;
  content: string;
};

export default function RadioButtonDefault(props: RadioButtonDefaultType): JSX.Element {
  const { name, id, onChange, value, valueForCheck, content } = props;

  return (
    <div className={classes['radio-element']}>
      <input
        className={classes['radio-style']}
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={valueForCheck === value}
        onChange={onChange}
      />
      <label htmlFor={id} className={classes['radio-item']}>
        {content}
      </label>
    </div>
  );
}
