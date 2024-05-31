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
  //   if (simpleFilters.Paperback) {
  //     if (Array.isArray(queryParams.filter)) {
  //       queryParams.filter.push(`variants.attributes.cover.key:"paperback"`);
  //     } else {
  //       queryParams.filter = [`variants.attributes.cover.key:"paperback"`];
  //     }
  //   }

  //   console.log('queryParams: ', queryParams);
  // };

  const setProductsqueryArgs = (): QueryParamsProductsProjections => {
    const queryParams: QueryParamsProductsProjections = {
      limit: productsInPage,
      offset: (curProductsPage - 1) * productsInPage,
      filter: [
        `variants.price.centAmount:range (${
          priceFilter.min ? priceFilter.min : 0
        } to ${priceFilter.max ? priceFilter.max : 10000})`,
      ],
      // variants.price.centAmount:range ({from} to {to}), ({from} to {to})
      // variants.scopedPrice.value.centAmount
    };

    if (category) {
      queryParams.filter = [`categories.id:"${curCategory?.id}"`];
    }

    // setSimpleFilters(queryParams);

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
