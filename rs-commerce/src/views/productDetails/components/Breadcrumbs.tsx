import { Link } from 'react-router-dom';
import style from '../style.module.css';

function Breadcrumbs({
  productName,
  breadcrumbLinks,
}: {
  productName: string;
  breadcrumbLinks: { name: string; path: string }[];
}) {
  return (
    <div className={style['breadcrumbs']}>
      <div className="container">
        <ul className={style['breadcrumbs__list']}>
          {breadcrumbLinks?.map((link) => (
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
