import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartInitialState } from 'types/types';

const initialState: CartInitialState = {
  cartData: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<Cart | CartPagedQueryResponse>) {
      state.cartData = action.payload;
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
