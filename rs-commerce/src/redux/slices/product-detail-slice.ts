import { ProductData } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetailSliceState } from 'types/registrationTypes';

const initialState: ProductDetailSliceState = {
  productDetail: null,
  activeSlide: 0,
  modalActiveSlide: 0,
};

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    setProductDetail(state, action: PayloadAction<ProductData | null>) {
      state.productDetail = action.payload;
    },
    setActiveSlide(state, action: PayloadAction<number>) {
      state.activeSlide = action.payload;
    },
    setModalActiveSlide(state, action: PayloadAction<number>) {
      state.modalActiveSlide = action.payload;
    },
  },
});

export const { reducer: productDetailReducer, actions: productDetailSliceActions } =
  productDetailSlice;
