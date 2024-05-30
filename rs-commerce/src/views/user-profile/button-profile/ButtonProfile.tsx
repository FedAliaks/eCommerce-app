import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { updateProfileSelector } from 'redux/selectors';
import classes from './buttonProfile.module.css';

export type BtnProfilePropsType = {
  content: string;
  colored: boolean;
  onClick: () => void;
};

export default function ButtonProfile(props: BtnProfilePropsType): JSX.Element {
  const { content, colored, onClick } = props;

  const { checkNewPassword } = useAppSelector(updateProfileSelector);

  return (
    <button
      type="button"
      className={
        colored
          ? `${classes['profile__button']} ${classes['profile__button_colored']}`
          : `${classes['profile__button']}`
      }
      onClick={onClick}
      disabled={!!(content === 'Save' && !checkNewPassword)}>
      {content}
    </button>
  );
}
