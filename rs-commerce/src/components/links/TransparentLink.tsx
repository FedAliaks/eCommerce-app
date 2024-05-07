import { Link } from 'react-router-dom';
import style from './style.module.css';

type TransparentLinkProps = {
  to: string;
  text: string;
};

function TransparentLink({ to, text }: TransparentLinkProps) {
  return (
    <Link to={to} className={style['link']}>
      {text}
    </Link>
  );
}

export default TransparentLink;
