import LilacLink from 'components/links/LilacLink';
import { ROUTE_PATH } from 'constants/constants';
import loginIcon from 'assets/main/login_icon.svg';
import signupIcon from 'assets/main/signup_icon.svg';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthSelector } from 'redux/selectors';
import style from '../style.module.css';

function TopBlock() {
  const { isAuth } = useAppSelector(apiAuthSelector);

  return (
    <section className={style['top-block']}>
      <div className={`container ${style['top-block-container']}`}>
        <div className={style['top-block-content']}>
          <h1 className={style['top-block-header']}>Explore the fascinating world of books</h1>
          <p className={style['top-block-text']}>
            Join our community to get special offers and always keep in touch
          </p>
          {!isAuth && (
            <div className={style['top-block-links']}>
              <LilacLink to={ROUTE_PATH.login}>
                Login <img src={loginIcon} alt="Login" />
              </LilacLink>
              <LilacLink to={ROUTE_PATH.registration}>
                Sign up
                <img src={signupIcon} alt="Sign up" />
              </LilacLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TopBlock;
