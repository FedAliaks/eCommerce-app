import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { Category } from '@commercetools/platform-sdk';
import CategoryItem from 'components/category-item/category-item';
import { Nullable } from 'types/types';
import { PAGE_NUMBER_ONE } from 'constants/constants';
import style from '../style.module.css';

function CatalogPageCategories(): JSX.Element {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(apiCategoriesProductsSelector);

  const handleCategoryClick = (data: Nullable<Category>): void => {
    dispatch(apiCategoriesProductsActions.setCurProductsPage(PAGE_NUMBER_ONE));
    dispatch(apiCategoriesProductsActions.setCurCategory(data));
  };

  return (
    <div className={style['category-wrapper']}>
      <div className={`container ${style['category']}`}>
        {categories && <CategoryItem data={null} onClick={handleCategoryClick} />}
        {categories &&
          categories.map((category: Category) => (
            <CategoryItem key={category.id} data={category} onClick={handleCategoryClick} />
          ))}
      </div>
    </div>
  );
}

export default CatalogPageCategories;
