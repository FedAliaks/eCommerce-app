import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { Category } from '@commercetools/platform-sdk';
import CategoryItem from 'components/category-item/category-item';
import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from '../style.module.css';

function CatalogPageCategories(): JSX.Element {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(apiCategoriesProductsSelector);

  const handleCategoryClick = (id: string): void => {
    dispatch(apiCategoriesProductsActions.setCurCategory(id));
  };

  return (
    <div className={style['category-wrapper']}>
      <div className={`container ${style['category']}`}>
        {categories && (
          <CategoryItem title={CATALOG_PAGE_TEXT.allCategories} onClick={handleCategoryClick} />
        )}
        {categories &&
          categories.map((category: Category) => (
            <CategoryItem
              key={category.id}
              title={category.name['en-US']!}
              onClick={handleCategoryClick}
            />
          ))}
      </div>
    </div>
  );
}

export default CatalogPageCategories;
