import { Link } from 'react-router-dom';
import style from './style.module.css';

type LilacLinkProps = {
  to: string;
  children: React.ReactNode;
};

function LilacLink({ to, children }: LilacLinkProps) {
  return (
    <Link to={to} className={style['link_lilac']}>
      {children}
    </Link>
  );
}

export default LilacLink;
