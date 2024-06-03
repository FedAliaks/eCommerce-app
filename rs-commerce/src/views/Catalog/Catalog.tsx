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
    // simpleFilters,
  } = useAppSelector(apiCategoriesProductsSelector);
  const { category } = useParams();

  // const setSimpleFilters = (queryParams: QueryParamsProductsProjections): void => {
  //   console.log('setSimpleFilters', simpleFilters);
  //   // console.log('setSimpleFilters', Object.entries(simpleFilters));
  //   // if (Object.entries(simpleFilters).length) {
  //   //   console.log('simpleFilters: ', simpleFilters);
  //   //   // if (Array.isArray(queryParams.filter)) {
  //   //   //   // queryParams.filter.push(`variants.attributes.cover.key:"paperback"`);
  //   //   //   queryParams.filter.push(`variants.attributes.cover:"Paperback"`);
  //   //   // } else {
  //   //   //   queryParams.filter = [`variants.attributes.cover:"Paperback"`];
  //   //   // }
  //   // }
  //   // queryParams.filter.push(`variants.attributes.format:"A5"`); работает
  //   console.log('queryParams: ', queryParams);
  // };

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

    // setSimpleFilters(queryParams);

    const sortQuery = SORT_REQUESTS[sortFilterValue];
    if (sortQuery) {
      queryParams.sort = [sortQuery];
    }

    if (searchInputValue) {
      queryParams['text.en'] = searchInputValue;
    }

    console.log('queryParams: ', queryParams);
    return queryParams;
  };

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
  }, [curProductsPage, category, searchInputValue, sortFilterValue, priceFilter]);

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
