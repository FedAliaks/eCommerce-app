import { Link } from 'react-router-dom';
import BreadcrumbsLinks from './constants';
import style from '../style.module.css';

function Breadcrumbs({ productName }: { productName: string }) {
  return (
    <div className={style['breadcrumbs']}>
      <div className="container">
        <ul className={style['breadcrumbs__list']}>
          {BreadcrumbsLinks.map((link) => (
            <li key={link.path} className={style['breadcrumbs__item']}>
              <Link to={link.path} className={style['breadcrumbs__link']}>
                {link.name}
              </Link>
            </li>
          ))}
          <li className={style['breadcrumbs__item']}>{productName}</li>
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
