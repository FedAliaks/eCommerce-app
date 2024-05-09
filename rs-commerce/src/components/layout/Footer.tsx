import { Link } from 'react-router-dom';
import style from './style.module.css';

function Footer() {
  const linkList = [
    {
      path: '/',
      title: 'Main',
    },
  ];
  return (
    <footer className={style['footer']}>
      <div className={`${style['footer-container']} container`}>
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
