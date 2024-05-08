import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from 'assets/images/logo.png';
import style from './style.module.css';

function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const rightList = [
    {
      path: '/login',
      title: 'Login',
      className: style['underline'],
    },
    {
      path: '/registration',
      title: 'Registration',
      className: style['underline'],
    },
  ];

  const toggleBurgerMenu = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);

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
