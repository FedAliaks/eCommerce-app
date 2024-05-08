import { ButtonBigProps } from 'types/types';
import style from './style.module.css';

function ButtonBig(props: ButtonBigProps): JSX.Element {
  const { isActiveStyle, content, onClick } = props;

  const btnStyle = (): string =>
    isActiveStyle
      ? `${style['login-page-btn']}`
      : `${style['login-page-btn']} ${style['btn-not-active']}`;

  return (
    <button type="button" className={btnStyle()} onClick={onClick}>
      {content}
    </button>
  );
}

export default ButtonBig;
