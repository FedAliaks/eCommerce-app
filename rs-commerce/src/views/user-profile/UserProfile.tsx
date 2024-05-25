import ProfileComponent from 'components/profile-component/profileComponent';
import { ProfileUsersComponents } from './elements';
import classes from './UserProfile.module.css';

export default function UserProfile(): JSX.Element {
  return (
    <div className={classes['profile']}>
      <div className={classes['profile__column']}>
        {ProfileUsersComponents.map((item, index) => (
          <ProfileComponent
            title={item.title}
            subtitle={item.subtitle}
            inputArray={item.inputArray}
            defaultAddress={item.defaultAddress}
            key={item.title || item.subtitle || `address${index}`}
          />
        ))}
      </div>
      <div className={classes['profile__column']}>
        <div>Change password</div>
      </div>
    </div>
  );
}
