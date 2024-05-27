import classes from './buttonProfile.module.css';

export type BtnProfilePropsType = {
  content: string;
  colored: boolean;
};

export default function ButtonProfile(props: BtnProfilePropsType): JSX.Element {
  const { content, colored } = props;
  return (
    <div
      className={
        colored
          ? `${classes['profile__button']} ${classes['profile__button_colored']}`
          : `${classes['profile__button']}`
      }>
      {content}
    </div>
  );
}
