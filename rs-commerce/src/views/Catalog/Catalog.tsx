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
import FiltersPopup from './components/FiltersPopup';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const { curProductsPage, productsInPage, curCategory, productsFilter, searchInputValue } =
    useAppSelector(apiCategoriesProductsSelector);

  const setProductsqueryArgs = (): QueryParamsProductsProjections => {
    const queryParams: QueryParamsProductsProjections = {
      limit: productsInPage,
      offset: (curProductsPage - 1) * productsInPage,
    };

    if (curCategory) {
      queryParams.filter = [`categories.id:"${curCategory.id}"`];
      // queryParams.filter.push(`variants.scopedPrice.value.centAmount:range (${1} to ${200})`);
    }

    // queryParams.staged = true;
    // queryParams.markMatchingVariants = true;
    // queryParams.fuzzy = true;

    if (searchInputValue) {
      queryParams['text.en'] = searchInputValue;
    }

    return queryParams;
  };

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
  }, [curProductsPage, curCategory, searchInputValue]);

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
