import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { QueryParamsProductsProjections } from 'types/types';
import Pagination from 'components/pagination/pagination';
import { useParams } from 'react-router-dom';
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
  const { category } = useParams();

  const setProductsqueryArgs = (): QueryParamsProductsProjections => {
    const queryParams: QueryParamsProductsProjections = {
      limit: productsInPage,
      offset: (curProductsPage - 1) * productsInPage,
    };

    if (category) {
      queryParams.filter = [`categories.id:"${curCategory?.id}"`];
      // queryParams.filter.push(`variants.scopedPrice.value.centAmount:range 1 to 200`);
      // queryParams.filter.push(`variants.attributes.color.label.en asc.max`);
      // queryParams.filter.push(`variants.attributes.name`);
    }

    // queryParams.staged = true;
    // queryParams.markMatchingVariants = true;
    // queryParams.fuzzy = true;

    if (searchInputValue) {
      queryParams['text.en'] = searchInputValue;
      // queryParams['text.EN-US'] = searchInputValue;
    }

    console.log('queryParams: ', queryParams);
    return queryParams;
  };

  useEffect(() => {
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
    dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
  }, [curProductsPage, category, searchInputValue]);

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
