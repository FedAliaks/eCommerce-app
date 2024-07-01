import classes from './buttonDefault.module.css';

export type BtnProfilePropsType = {
  content: string;
  colored: boolean;
  onClick: () => void;
  isActive: boolean;
  small?: boolean;
};

export default function ButtonDefault(props: BtnProfilePropsType): JSX.Element {
  const { content, colored, onClick, isActive, small } = props;

  return (
    <button
      type="button"
      className={
        colored && isActive
          ? `${classes['profile__button']} ${classes['profile__button_colored']} ${small ? classes['profile__button_small'] : ' '}     `
          : `${classes['profile__button']}`
      }
      onClick={onClick}
      disabled={!isActive}>
      {content}
    </button>
  );
}
