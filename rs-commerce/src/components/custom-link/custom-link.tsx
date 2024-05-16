import { Link } from 'react-router-dom';
import { CustomLinkProps } from 'types/types';
import style from './style.module.css';

function CustomLink({ to, elStyle, text }: CustomLinkProps): JSX.Element {
  return (
    <Link to={to} className={style[`${elStyle}`]}>
      {text}
    </Link>
  );
}

export default CustomLink;
