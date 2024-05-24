import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CATALOG_PAGE_TEXT, PAGE_NUMBER_ONE, PRODUCTS_IN_PAGE } from 'constants/constants';
import { ApiCategoriesProductsSliceState, Nullable, QueryParamsProducts } from 'types/types';

const initialState: ApiCategoriesProductsSliceState = {
  isLoadingCategories: false,
  categories: null,
  curCategory: CATALOG_PAGE_TEXT.allCategories,
  isLoadingProducts: false,
  queryParamsProducts: null,
  products: null,
  productsTotal: null,
  curProductsPage: PAGE_NUMBER_ONE,
  productsInPage: PRODUCTS_IN_PAGE,
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
    setCurCategory(state, action: PayloadAction<string>) {
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
  },
});

export const { reducer: apiCategoriesProductsReducer, actions: apiCategoriesProductsActions } =
  apiCategoriesProductsSlice;
