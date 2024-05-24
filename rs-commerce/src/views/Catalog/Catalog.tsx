import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { QueryParamsProductsProjections } from 'types/types';
import Pagination from 'components/pagination/pagination';
import {
  CatalogPageCategories,
  CatalogPageFilters,
  CatalogPageHeader,
  CatalogPageProducts,
} from './components';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const { curProductsPage, productsInPage } = useAppSelector(apiCategoriesProductsSelector);

  const setProductsqueryArgs = (): QueryParamsProductsProjections => ({
    limit: productsInPage,
    offset: (curProductsPage - 1) * productsInPage,
  });

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
  }, [curProductsPage]);

  return (
    <>
      <CatalogPageHeader />
      <CatalogPageFilters />
      <CatalogPageCategories />
      <CatalogPageProducts />
      <Pagination />
    </>
  );
}

export default Catalog;
