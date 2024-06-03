import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  INITIAL_PRICE_FILTER_VALUE,
  INITIAL_SIMPLE_FILTER_VALUES,
  INITIAL_SORT_FILTER_VALUE,
  PAGE_NUMBER_ONE,
  PRODUCTS_IN_PAGE,
} from 'constants/constants';
import {
  ApiCategoriesProductsSliceState,
  FilterType,
  Nullable,
  PriceFilterValues,
  QueryParamsProducts,
  SimpleFiltersValues,
} from 'types/types';

const initialState: ApiCategoriesProductsSliceState = {
  isLoadingCategories: false,
  categories: null,
  curCategory: null,
  isLoadingProducts: false,
  queryParamsProducts: null,
  products: null,
  productsTotal: null,
  curProductsPage: PAGE_NUMBER_ONE,
  productsInPage: PRODUCTS_IN_PAGE,
  searchInputValue: '',
  productsFilter: null,
  sortFilterValue: INITIAL_SORT_FILTER_VALUE,
  priceFilter: INITIAL_PRICE_FILTER_VALUE,
  simpleFilters: INITIAL_SIMPLE_FILTER_VALUES,
  canUseMainFilters: true,
};

export const apiCategoriesProductsSlice = createSlice({
  name: 'apiCategoriesProducts',
  initialState,
  reducers: {
    startCategoriesFetch(state) {
      state.isLoadingCategories = true;
    },
    getCategoriesSuccess: (state, action: PayloadAction<{ categories: Category[] }>) => {
      state.categories = action.payload.categories;
    },
    setIsLoadingCategories(state, action: PayloadAction<boolean>) {
      state.isLoadingCategories = action.payload;
    },
    setCurCategory(state, action: PayloadAction<Nullable<Category>>) {
      state.curCategory = action.payload;
    },
    startProductsFetch(state, action: PayloadAction<{ data: QueryParamsProducts }>) {
      state.isLoadingProducts = true;
      state.queryParamsProducts = action.payload.data;
    },
    getProductsSuccess: (state, action: PayloadAction<{ products: ProductProjection[] }>) => {
      state.products = action.payload.products;
    },
    setIsLoadingProducts(state, action: PayloadAction<boolean>) {
      state.isLoadingProducts = action.payload;
    },
    setCurProductsTotal(state, action: PayloadAction<Nullable<number>>) {
      state.productsTotal = action.payload;
    },
    setCurProductsPage(state, action: PayloadAction<number>) {
      state.curProductsPage = action.payload;
    },
    setSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    setProductsFilter(state, action: PayloadAction<Nullable<FilterType>>) {
      state.productsFilter = action.payload;
    },
    setSortFilterValue(state, action: PayloadAction<string>) {
      state.sortFilterValue = action.payload;
    },
    setSimpleFilters(state, action: PayloadAction<SimpleFiltersValues>) {
      state.simpleFilters = action.payload;
    },
    setPriceFilter(state, action: PayloadAction<PriceFilterValues>) {
      state.priceFilter = action.payload;
    },
    setCanUseMainFilters(state, action: PayloadAction<boolean>) {
      state.canUseMainFilters = action.payload;
    },
  },
});

export const { reducer: apiCategoriesProductsReducer, actions: apiCategoriesProductsActions } =
  apiCategoriesProductsSlice;
