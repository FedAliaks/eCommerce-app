import { Category, Product } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PAGE_NUMBER_ONE } from 'constants/constants';
import { ApiCategoriesProductsSliceState, Nullable } from 'types/types';

const initialState: ApiCategoriesProductsSliceState = {
  isLoadingCategories: false,
  categories: null,
  isLoadingProducts: false,
  products: null,
  curProductsTotal: null,
  curProductsPage: PAGE_NUMBER_ONE,
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
    startProductsFetch(state) {
      state.isLoadingProducts = true;
    },
    getProductsSuccess: (state, action: PayloadAction<{ products: Product[] }>) => {
      state.products = action.payload.products;
    },
    setIsLoadingProducts(state, action: PayloadAction<boolean>) {
      state.isLoadingProducts = action.payload;
    },
    setCurProductsTotal(state, action: PayloadAction<Nullable<number>>) {
      state.curProductsTotal = action.payload;
    },
  },
});

export const { reducer: apiCategoriesProductsReducer, actions: apiCategoriesProductsActions } =
  apiCategoriesProductsSlice;
