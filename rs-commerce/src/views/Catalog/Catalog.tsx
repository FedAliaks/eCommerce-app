import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { QueryParamsProductsProjections } from 'types/types';
import Pagination from 'components/pagination/pagination';
import { useParams } from 'react-router-dom';
import { CATALOG_PAGE_TEXT, PAGE_NUMBER_ONE, ROUTE_PATH, SORT_REQUESTS } from 'constants/constants';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import { apiGetOneCategory } from 'api/api';
import toast from 'react-hot-toast';
import { ErrorResponse } from '@commercetools/importapi-sdk';
import { CatalogPageCategories, CatalogPageFilters, CatalogPageProducts } from './components';
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

  const getCurrentCategoryData = async (categorySlug: string) => {
    try {
      const categoryData = await apiGetOneCategory(categorySlug);

      dispatch(apiCategoriesProductsActions.setCurCategory(categoryData.body));
    } catch (e) {
      const error = e as ErrorResponse;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (category) {
      getCurrentCategoryData(category);
    } else {
      dispatch(apiCategoriesProductsActions.setCurCategory(null));
    }
    dispatch(apiCategoriesProductsActions.setCurProductsPage(PAGE_NUMBER_ONE));
  }, [category]);

  const setSimpleFilters = (queryParams: QueryParamsProductsProjections): void => {
    Object.entries(simpleFilters).forEach((el) => {
      const curNameFilter = el[0];
      const curFilterValues = Object.entries(el[1]);
      const curFiltersForRequest: string[] = [];
      let stringForResponse = '';
      curFilterValues.forEach((elm) => {
        if (elm[1]) {
          curFiltersForRequest.push(`"${elm[0]}"`);
        }
      });
      if (curFiltersForRequest.length) stringForResponse = curFiltersForRequest.join(',');

      if (stringForResponse) {
        if (Array.isArray(queryParams.filter)) {
          queryParams.filter.push(`variants.attributes.${curNameFilter}:${stringForResponse}`);
        }
      }
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

    if (curCategory) {
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
    dispatch(apiCategoriesProductsActions.startCategoriesFetch());
  }, []);

  useEffect(() => {
    if (canUseMainFilters) {
      dispatch(apiCategoriesProductsActions.startProductsFetch({ data: setProductsqueryArgs() }));
    }
  }, [
    curProductsPage,
    curCategory,
    searchInputValue,
    sortFilterValue,
    priceFilter,
    canUseMainFilters,
  ]);

  const pageName = curCategory?.name['en'] ? curCategory.name['en'] : CATALOG_PAGE_TEXT.headerTitle;

  const breadcrumbList = useMemo(() => {
    const items = [
      { name: 'Main', link: ROUTE_PATH.main },
      {
        name: CATALOG_PAGE_TEXT.headerTitle,
        link: curCategory ? ROUTE_PATH.catalog : null,
      },
    ];

    if (curCategory) {
      items.push({ name: pageName, link: null });
    }

    return items;
  }, [curCategory, pageName]);

  return (
    <>
      <Breadcrumb linksList={breadcrumbList} currentPageName={pageName} />
      <CatalogPageFilters />
      <CatalogPageCategories />
      <CatalogPageProducts />
      <Pagination />
      {productsFilter && <FiltersPopup />}
    </>
  );
}

export default Catalog;
