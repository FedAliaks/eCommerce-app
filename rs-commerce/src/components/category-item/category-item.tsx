import { useEffect } from 'react';
import { CategoryItemProps } from 'types/types';
import { useAppDispatch } from 'hooks/typed-react-redux-hooks';
import { CATALOG_PAGE_TEXT, PAGE_NUMBER_ONE, ROUTE_PATH } from 'constants/constants';
import { Link, useParams } from 'react-router-dom';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import style from './style.module.css';

function CategoryItem({ data }: CategoryItemProps) {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const title = data ? data.name['en'] : CATALOG_PAGE_TEXT.allCategories;

  useEffect(() => {
    if (category && data?.slug['en'] === category) {
      dispatch(apiCategoriesProductsActions.setCurProductsPage(PAGE_NUMBER_ONE));
      dispatch(apiCategoriesProductsActions.setCurCategory(data));
    }
  }, [category]);

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
