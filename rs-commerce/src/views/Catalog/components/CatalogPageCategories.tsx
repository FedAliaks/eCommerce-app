import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { Category } from '@commercetools/platform-sdk';
import CategoryItem from 'components/category-item/category-item';
import style from '../style.module.css';

function CatalogPageCategories(): JSX.Element {
  const { categories } = useAppSelector(apiCategoriesProductsSelector);

  return (
    <div className={style['category-wrapper']}>
      <div className={`container ${style['category']}`}>
        {categories && <CategoryItem data={null} />}
        {categories &&
          categories.map((category: Category) => (
            <CategoryItem key={category.id} data={category} />
          ))}
      </div>
    </div>
  );
}

export default CatalogPageCategories;
