import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { QueryParamsProductsProjections } from 'types/types';
import Pagination from 'components/pagination/pagination';
import { useParams } from 'react-router-dom';
import { SORT_REQUESTS } from 'constants/constants';
import {
  CatalogPageCategories,
  CatalogPageFilters,
  CatalogPageHeader,
  CatalogPageProducts,
} from './components';
import FiltersPopup from './components/FiltersPopup';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    curProductsPage,
    productsInPage,
    curCategory,
    productsFilter,
    searchInputValue,
    sortFilterValue,
  } = useAppSelector(apiCategoriesProductsSelector);
  const { category } = useParams();

  const setProductsqueryArgs = (): QueryParamsProductsProjections => {
    const queryParams: QueryParamsProductsProjections = {
      limit: productsInPage,
      offset: (curProductsPage - 1) * productsInPage,
    };

    if (category) {
      queryParams.filter = [`categories.id:"${curCategory?.id}"`];
    }

    const sortQuery = SORT_REQUESTS[sortFilterValue];
    if (sortQuery) {
      queryParams.sort = [sortQuery];
    }

    if (searchInputValue) {
      queryParams['text.en'] = searchInputValue;
    }

    // console.log('queryParams: ', queryParams);
    return queryParams;
  };

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
  }, [curProductsPage, category, searchInputValue, sortFilterValue]);

  return (
    <>
      <CatalogPageHeader />
      <CatalogPageFilters />
      <CatalogPageCategories />
      <CatalogPageProducts />
      <Pagination />
      {productsFilter && <FiltersPopup />}
    </>
  );
}

export default Catalog;
