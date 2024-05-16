import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from 'assets/images/logo.png';
import { ROUTE_PATH } from 'constants/constants';
import style from './style.module.css';

function Header() {
  const location = useLocation();

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const rightList = [
    {
      path: ROUTE_PATH.login,
      title: 'Login',
      className: style['underline'],
    },
    {
      path: ROUTE_PATH.registration,
      title: 'Registration',
      className: style['underline'],
    },
  ];

  const toggleBurgerMenu = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);

  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [location]);

  return (
    <header className={`${style['header']} container`}>
      <Link to="/" className={style['logo']}>
        <img src={Logo} width="40" height="40" alt="Hurricane bookstore logo" />
        <span>Hurricane bookstore</span>
      </Link>

      <button
        className={style['burger_menu']}
        onClick={toggleBurgerMenu}
        type="button"
        aria-label="burger menu">
        <span />
      </button>

      <nav className={`${style['nav']} ${isBurgerMenuOpen ? style['nav-open'] : ''}`}>
        <ul className={style['nav-right']}>
          {rightList.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={item.className} aria-label={item.title}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
