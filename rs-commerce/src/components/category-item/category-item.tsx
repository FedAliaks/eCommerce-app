import { CategoryItemProps } from 'types/types';
import { CATALOG_PAGE_TEXT, ROUTE_PATH } from 'constants/constants';
import { Link, useParams } from 'react-router-dom';
import style from './style.module.css';

function CategoryItem({ data }: CategoryItemProps) {
  const { category } = useParams();
  const title = data ? data.name['en'] : CATALOG_PAGE_TEXT.allCategories;

  const curItemStyle = (): string =>
    `${style['category-item']} ${category === data?.slug['en'] ? style['active'] : ''}`;

  return (
    <Link
      to={`${ROUTE_PATH.catalog}${data?.slug['en'] ? `/${data?.slug['en']}` : ''}`}
      className={curItemStyle()}
      role="presentation">
      {title}
    </Link>
  );
}

export default CategoryItem;
