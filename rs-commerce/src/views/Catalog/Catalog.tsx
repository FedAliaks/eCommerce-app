import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { QueryParamsProducts } from 'types/types';
import { getAllProductsProjections } from 'api/api';
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

  const setProductsqueryArgs = (): QueryParamsProducts => ({
    offset: (curProductsPage - 1) * productsInPage,
  });

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
    getAllProductsProjections();
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
