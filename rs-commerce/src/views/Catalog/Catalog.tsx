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
    priceFilter,
    simpleFilters,
    canUseMainFilters,
  } = useAppSelector(apiCategoriesProductsSelector);
  const { category } = useParams();

  const setSimpleFilters = (queryParams: QueryParamsProductsProjections): void => {
    Object.entries(simpleFilters).forEach((el) => {
      const nameFilter = el[0];
      const curFilterValues = Object.entries(el[1]);
      curFilterValues.forEach((elm) => {
        if (elm[1]) {
          if (Array.isArray(queryParams.filter)) {
            queryParams.filter.push(`variants.attributes.${nameFilter}:"${elm[0]}"`);
          }
        }
      });
    });
  };

  const setProductsqueryArgs = (): QueryParamsProductsProjections => {
    const queryParams: QueryParamsProductsProjections = {
      limit: productsInPage,
      offset: (curProductsPage - 1) * productsInPage,
      filter: [
        `variants.price.centAmount:range (${
          priceFilter.min ? priceFilter.min * 100 : 0
        } to ${priceFilter.max ? priceFilter.max * 100 : 10000})`,
      ],
    };

    if (category) {
      if (Array.isArray(queryParams.filter))
        queryParams.filter.push(`categories.id:"${curCategory?.id}"`);
    }

    setSimpleFilters(queryParams);

    const sortQuery = SORT_REQUESTS[sortFilterValue];
    if (sortQuery) {
      queryParams.sort = [sortQuery];
    }

    if (searchInputValue) {
      queryParams['text.en'] = searchInputValue;
    }

    return queryParams;
  };

  useEffect(() => {
    if (canUseMainFilters) {
      dispatch(apiCategoriesProductsActions.startCategoriesFetch());
      dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
    }
  }, [
    curProductsPage,
    category,
    searchInputValue,
    sortFilterValue,
    priceFilter,
    canUseMainFilters,
  ]);

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
