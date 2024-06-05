import { Link } from 'react-router-dom';
import style from './style.module.css';

function Breadcrumb({
  linksList,
  currentPageName,
}: {
  linksList: { link: string | null; name: string }[];
  currentPageName: string;
}) {
  return (
    <div className={style['container']}>
      <h1 className={style['title']}>{currentPageName}</h1>
      <ul className={style['subtitle']}>
        {linksList.map((item) => (
          <li key={item.link}>
            {item.link ? (
              <Link to={item.link} aria-label={item.name}>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Breadcrumb;
