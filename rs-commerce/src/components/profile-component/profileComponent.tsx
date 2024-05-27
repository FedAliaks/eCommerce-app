import InputProfile from './input-profile/inputProfile';
import classes from './profileComponent.module.css';
import { ProfileComponentType } from './types';

export default function ProfileComponent(props: ProfileComponentType): JSX.Element {
  const { title, inputArray, subtitle, defaultAddress } = props;

  return (
    <div className={classes['profile__component']}>
      {title && (
        <div className={classes['profile__title-component']}>
          <h2>{title}</h2>
          <div className={classes['profile__edit-image']} />
        </div>
      )}
      <div className={classes['profile__subtitle-component']}>
        {subtitle && <h3>{subtitle}</h3>}
        {defaultAddress && <p>Default address</p>}
      </div>
      <div className={classes['profile__inputs-container']}>
        {inputArray.map((item) => (
          <InputProfile
            title={item.title}
            id={item.id}
            isSizeSmall={item.isSizeSmall}
            type={item.type}
            value={item.value}
            key={item.id}
            isDisabled={item.isDisabled}
          />
        ))}
      </div>
    </div>
  );
}
