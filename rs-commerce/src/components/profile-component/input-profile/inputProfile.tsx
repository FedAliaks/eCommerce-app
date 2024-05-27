import { InputProfileType } from '../types';
import classes from './inputProfile.module.css';

export default function InputProfile(props: InputProfileType): JSX.Element {
  const { title, id, isSizeSmall, type, value, isDisabled, handler } = props;
  return (
    <div className={classes['profile__input-component']}>
      <p className={classes['profile__input-title']}>{title}</p>
      <label htmlFor={id}>
        <div className={classes['profile__input-block']}>
          <input
            className={
              isSizeSmall
                ? `${classes['profile__input']} ${classes['profile__input_small']}`
                : classes['profile__input']
            }
            id={id}
            type={type}
            disabled={isDisabled}
            value={value}
            onChange={handler}
          />
        </div>
      </label>
    </div>
  );
}
