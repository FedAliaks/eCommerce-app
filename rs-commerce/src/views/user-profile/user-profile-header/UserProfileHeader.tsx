import classes from './userProfileHeader.module.css';

export type ProfileUserHeaderType = {
  title: string;
  subtitle: string;
};

export default function UserProfileHeader(props: ProfileUserHeaderType): JSX.Element {
  const { title, subtitle } = props;

  return (
    <div className={classes['profile__header']}>
      <div className={classes['profile__header-container']}>
        <p className={classes['profile__header-title']}>{title}</p>
        <p className={classes['profile__header-subtitle']}>{subtitle}</p>
      </div>
    </div>
  );
}
