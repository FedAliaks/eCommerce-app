import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'constants/constants';
import style from './style.module.css';

function Footer() {
  const linkList = [
    {
      path: ROUTE_PATH.main,
      title: 'Main',
    },
    {
      path: ROUTE_PATH.catalog,
      title: 'Catalog',
    },
  ];
  return (
    <footer className={style['footer']}>
      <div className="container">
        <div className={style['footer-top']}>
          <div className={style['logo']}>Hurricane bookstore</div>
          <nav className={style['nav']}>
            <ul>
              {linkList.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} aria-label={item.title}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={style['footer-bottom']}>2024 HurricaneTeam RS School</div>
      </div>
    </footer>
  );
}

export default Footer;
