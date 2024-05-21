import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { Category, Product } from '@commercetools/platform-sdk';
import CategoryItem from 'components/category-item/category-item';
import ProductItem from 'components/product-item/product-item';
import Pagination from 'components/pagination/pagination';
import { QueryParamsProducts } from 'types/types';
import { CATALOG_PAGE_TEXT } from 'constants/constants';
import style from './style.module.css';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const { categories, products, curProductsPage, productsInPage } = useAppSelector(
    apiCategoriesProductsSelector,
  );

  const setProductsqueryArgs = (): QueryParamsProducts => ({
    offset: (curProductsPage - 1) * productsInPage,
  });

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
  }, [curProductsPage]);

  const handleCategoryClick = (id: string): void => {
    dispatch(apiCategoriesProductsActions.setCurCategory(id));
  };

  return (
    <div className={style['catalog-page']}>
      <div className={style['category']}>
        <div className={style['category-title']}>{CATALOG_PAGE_TEXT.titleCategory}</div>
        {categories &&
          categories.map((category: Category) => (
            <CategoryItem
              key={category.id}
              title={category.key!}
              id={category.id}
              onClick={handleCategoryClick}
            />
          ))}
      </div>
      <div className={style['products']}>
        <div className={style['products-title']}>
          <div className={style['title']}>{CATALOG_PAGE_TEXT.titleProducts}</div>
          <Pagination />
        </div>
        <div className={style['products-items']}>
          {products &&
            products.map((product: Product) => <ProductItem key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
