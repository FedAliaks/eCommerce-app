import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from 'assets/images/logo.png';
import {
  LOCAL_STORAGE_AUTH,
  LOCAL_STORAGE_TOKEN,
  ROUTE_PATH,
  TOASTS_TEXT,
} from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { apiAuthSelector } from 'redux/selectors';
import toast from 'react-hot-toast';
import style from './style.module.css';

function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector(apiAuthSelector);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const rightList = [
    {
      path: ROUTE_PATH.catalog,
      title: 'Catalog',
      className: style['underline'],
      withAuth: true,
    },
    {
      path: ROUTE_PATH.login,
      title: 'Login',
      className: style['underline'],
      withAuth: false,
    },
    {
      path: ROUTE_PATH.registration,
      title: 'Registration',
      className: style['underline'],
      withAuth: false,
    },
  ];

  const toggleBurgerMenu = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);

  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(false));
    dispatch(apiAuthActions.resetApiAuthSlice());
    toast.success(TOASTS_TEXT.logoutMessage);

    navigate(ROUTE_PATH.main);
  };

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
          {rightList
            .filter((item) => (isAuth ? item.withAuth : true))
            .map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={item.className} aria-label={item.title}>
                  {item.title}
                </Link>
              </li>
            ))}
          {isAuth && (
            <li>
              <button
                aria-label="Logout"
                onClick={handleLogout}
                className={style['logout']}
                type="button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
