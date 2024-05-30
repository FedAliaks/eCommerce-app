import { CategoryItemProps } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { CATALOG_PAGE_TEXT, PAGE_NUMBER_ONE, ROUTE_PATH } from 'constants/constants';
import { Link } from 'react-router-dom';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import style from './style.module.css';

function CategoryItem({ data }: CategoryItemProps) {
  const dispatch = useAppDispatch();
  const { curCategory } = useAppSelector(apiCategoriesProductsSelector);
  const title = data ? data.name['en'] : CATALOG_PAGE_TEXT.allCategories;

  const curItemClick = (): void => {
    dispatch(apiCategoriesProductsActions.setCurProductsPage(PAGE_NUMBER_ONE));
    dispatch(apiCategoriesProductsActions.setCurCategory(data));
  };

  const curItemStyle = (): string =>
    `${style['category-item']} ${curCategory?.name['en'] === data?.name['en'] ? style['active'] : ''}`;

  return (
    <Link
      to={`${ROUTE_PATH.catalog}${data?.slug['en'] ? `/${data?.slug['en']}` : ''}`}
      className={curItemStyle()}
      role="presentation"
      onClick={curItemClick}>
      {title}
    </Link>
  );
}

export default CategoryItem;
